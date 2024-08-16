import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { PasswordResetService } from '#tokens/services/password_reset_service'

import vine from '@vinejs/vine'

@inject()
export default class ForgotPasswordController {
  static EmailValidator = vine.compile(
    vine.object({
      email: vine.string().trim().email().normalizeEmail(),
    })
  )

  constructor(private passwordResetService: PasswordResetService) {}

  render({ inertia }: HttpContext) {
    return inertia.render('tokens/forgot_password')
  }

  async execute({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(ForgotPasswordController.EmailValidator)
    await this.passwordResetService.sendTo(email)

    return response.redirect().back()
  }
}
