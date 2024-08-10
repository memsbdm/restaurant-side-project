import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { UserService } from '#users/services/user_service'
import { UserRole } from '#users/enums/user_role'
import { tuyau } from '#inertia/core/providers/tuyau'

@inject()
export default class RegisterProController {
  static StoreProValidator = vine.compile(
    vine.object({
      firstName: vine.string().trim().toLowerCase(),
      lastName: vine.string().trim().toLowerCase(),
      username: vine
        .string()
        .trim()
        .toLowerCase()
        .unique(async (db, value) => {
          const user = await db.from('users').where('username', value).first()
          return !user
        }),
      email: vine
        .string()
        .trim()
        .email()
        .toLowerCase()
        .unique(async (db, value) => {
          const user = await db.from('users').where('email', value).first()
          return !user
        }),
      phone: vine.string().mobile(),
      password: vine.string().minLength(8).confirmed({ confirmationField: 'passwordConfirmation' }),
    })
  )

  constructor(private userService: UserService) {}

  render({ inertia }: HttpContext) {
    return inertia.render('auth/register_pro')
  }

  async execute({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(RegisterProController.StoreProValidator, {
      messagesProvider: new SimpleMessagesProvider({ confirmed: 'Passwords do not match' }),
    })

    const user = await this.userService.register({
      ...payload,
      displayedName: payload.username,
      roleId: UserRole.Pro,
    })
    await auth.use('web').login(user)

    return response.redirect().toPath(tuyau.$url('protected'))
  }
}
