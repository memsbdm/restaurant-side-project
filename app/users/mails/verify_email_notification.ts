import router from '@adonisjs/core/services/router'
import { BaseMail } from '@adonisjs/mail'
import env from '#start/env'
import type User from '#users/models/user'

export default class VerifyEmailNotification extends BaseMail {
  constructor(
    private user: User,
    private token: string
  ) {
    super()
  }
  from = 'noreply@example.com'
  subject = 'Please verify your email'
  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    const domain = env.get('DOMAIN')
    const path = router.builder().params({ token: this.token }).make('verify.email.verify')
    const url = domain + path

    this.message.to(this.user.email)
    this.message.html(
      `Please click the following link to verify your email. <a href="${url}">Verify email.</a>`
    )
  }
}
