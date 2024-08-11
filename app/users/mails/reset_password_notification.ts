import { BaseMail } from '@adonisjs/mail'
import type User from '#users/models/user'
import { tuyau } from '#inertia/core/providers/tuyau'

export default class ResetPasswordNotification extends BaseMail {
  constructor(
    private user: User,
    private token: string
  ) {
    super()
  }
  from = 'app@example.com'
  subject = 'Reset your password'
  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    const url = tuyau.$url('reset.password', { params: { token: this.token } })

    this.message.to(this.user.email)
    this.message.html(`Reset your password by <a href="${url}">clicking here.</a>`)
  }
}
