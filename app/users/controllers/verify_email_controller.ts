import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TokenService } from '#tokens/services/token_service'
import { UserService } from '#users/services/user_service'
import { TokenType } from '#tokens/enums/token_type'
import { VerifyEmailService } from '#tokens/services/verify_email_service'

@inject()
export default class VerifyEmailController {
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private verifyEmailService: VerifyEmailService
  ) {}

  render({ inertia }: HttpContext) {
    return inertia.render('tokens/email_verification')
  }

  async execute({ params, response }: HttpContext) {
    const user = await this.tokenService.getTokenUser(params.token, TokenType.VerifyEmail)

    if (!user) {
      return response.redirect().toPath('/')
    }

    await this.userService.verifyEmail(user)
    await this.tokenService.expireTokensOfType(TokenType.VerifyEmail, user)

    return response.redirect().back()
  }

  async resend({ auth, response }: HttpContext) {
    const user = auth.user!
    if (user.isEmailVerified) {
      return response.redirect().toPath('/')
    }
    await this.tokenService.expireTokensOfType(TokenType.VerifyEmail, user)
    await this.verifyEmailService.sendTo(user)

    return response.redirect().back()
  }
}
