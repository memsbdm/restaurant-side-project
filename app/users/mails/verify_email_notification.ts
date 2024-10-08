import { BaseMail } from '@adonisjs/mail'
import type User from '#users/models/user'
import { tuyau } from '#inertia/core/providers/tuyau'

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
    const url = tuyau.$url('verify.email.verify', { params: { token: this.token } })

    this.message.to(this.user.email)
    this.message.html(
      `Please click the following link to verify your email. <a href="${url}">Verify email.</a>`
    )
  }
}
