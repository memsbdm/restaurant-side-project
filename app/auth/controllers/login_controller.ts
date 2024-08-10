import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { AuthService } from '#auth/services/auth_service'
import vine from '@vinejs/vine'

@inject()
export default class LoginController {
  static LoginValidator = vine.compile(
    vine.object({
      login: vine.string().trim().toLowerCase(),
      password: vine.string(),
    })
  )
  constructor(private authService: AuthService) {}

  render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async execute({ request, auth, response }: HttpContext) {
    const { login, password } = await request.validateUsing(LoginController.LoginValidator)

    const user = await this.authService.attempt(login, password)
    await auth.use('web').login(user)

    return response.redirect().toPath('/')
  }
}
