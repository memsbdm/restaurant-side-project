import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { DateTime } from 'luxon'
import User, { type UserId } from '#users/models/user'
import type { TokenTypeId } from '#tokens/enums/token_type'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: UserId

  @column()
  declare typeId: TokenTypeId

  @column()
  declare token: string

  @column.dateTime()
  declare expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
