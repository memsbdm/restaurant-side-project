import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { UserRoleId } from '#users/enums/user_role'

export default class RoleMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn, roleId: UserRoleId) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const user = auth?.user
    if (!user || user.roleId !== roleId) {
      return response.redirect().toPath('/')
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
