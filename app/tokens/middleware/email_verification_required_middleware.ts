import { tuyau } from '#inertia/core/providers/tuyau'
import { UserRole } from '#users/enums/user_role'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class EmailVerificationRequiredMiddleware {
  async handle({ auth, response, route }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    await auth.check()
    const user = auth.user

    if (user) {
      const isAuthorizedRoute = route?.name?.includes(tuyau.$route('verify.email').name)
      const emailNotVerified = !user.isEmailVerified
      if (emailNotVerified && !isAuthorizedRoute) {
        return response.redirect().toPath(tuyau.$url('verify.email'))
      }
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
