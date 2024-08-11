import { inject } from '@adonisjs/core'
import { TokenService } from '#tokens/services/token_service'
import type User from '#users/models/user'
import VerifyEmailNotification from '#users/mails/verify_email_notification'
import { TokenType } from '#tokens/enums/token_type'
import { MailService } from '#core/exceptions/services/mail_service'

@inject()
export class VerifyEmailService {
  constructor(
    private tokenService: TokenService,
    private mailService: MailService
  ) {}

  async sendTo(user: User): Promise<void> {
    const token = await this.tokenService.generateTokenOfType(TokenType.VerifyEmail, user)
    await this.mailService.sendLater(new VerifyEmailNotification(user, token))
  }
}
