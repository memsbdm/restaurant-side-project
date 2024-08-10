import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from '#users/models/user'
import type { UserRoleId } from '#users/enums/user_role'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: UserRoleId

  @column()
  declare name: string

  @hasMany(() => User)
  declare users: HasMany<typeof User>
}
