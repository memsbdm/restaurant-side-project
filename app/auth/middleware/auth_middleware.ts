import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { tuyau } from '#inertia/core/providers/tuyau'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */

export default class AuthMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const user = auth?.user
    if (!user) {
      return response.redirect().toPath(tuyau.$url('auth.login'))
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
