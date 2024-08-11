import { inject } from '@adonisjs/core'
import { BaseMail } from '@adonisjs/mail'
import mail from '@adonisjs/mail/services/main'

@inject()
export class MailService {
  async sendLater(model: BaseMail): Promise<void> {
    await mail.sendLater(model)
  }
}
