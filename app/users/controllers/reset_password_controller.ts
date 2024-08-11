import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TokenService } from '#tokens/services/token_service'
import { UserService } from '#users/services/user_service'
import { TokenType } from '#tokens/enums/token_type'
import vine from '@vinejs/vine'

@inject()
export default class ResetPasswordController {
  static ResetPasswordValidator = vine.compile(
    vine.object({
      token: vine.string(),
      password: vine.string().minLength(8).confirmed({ confirmationField: 'passwordConfirmation' }),
    })
  )

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  async render({ inertia, params }: HttpContext) {
    const token = params.token
    const isValid = await this.tokenService.verifyTokenOfType(TokenType.ResetPassword, token)

    return inertia.render('tokens/reset_password', { isValid, token })
  }

  async execute({ auth, request, response }: HttpContext) {
    const { token, password } = await request.validateUsing(
      ResetPasswordController.ResetPasswordValidator
    )
    const user = await this.tokenService.getTokenUser(token, TokenType.ResetPassword)

    if (!user) {
      return response.redirect().toPath('/')
    }

    await this.userService.changePassword(user, password)
    await auth.use('web').login(user)
    await this.tokenService.expireTokensOfType(TokenType.ResetPassword, user)

    return response.redirect().toPath('/')
  }
}
