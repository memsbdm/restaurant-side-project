import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class LogoutController {
  async execute({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect().toPath('/')
  }
}
