import { inject } from '@adonisjs/core'
import { TokenService } from '#tokens/services/token_service'
import { TokenType } from '#tokens/enums/token_type'
import { UserService } from '#users/services/user_service'
import { MailService } from '#core/exceptions/services/mail_service'
import ResetPasswordNotification from '#users/mails/reset_password_notification'

@inject()
export class PasswordResetService {
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private mailService: MailService
  ) {}

  async sendTo(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email)
    if (!user) return
    const token = await this.tokenService.generateTokenOfType(TokenType.ResetPassword, user)
    await this.mailService.sendLater(new ResetPasswordNotification(user, token))
  }
}
