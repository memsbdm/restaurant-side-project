import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import type { DateTime } from 'luxon'
import User, { type UserId } from '#users/models/user'
import type { RestaurantStatusId } from '#restaurants/enums/restaurant_status'
import { Opaque } from '@adonisjs/core/types/helpers'
import OwnershipDocument from '#restaurants/models/ownership_document'

export type RestaurantId = Opaque<'RestaurantId', string>

export default class Restaurant extends BaseModel {
  @column({ isPrimary: true })
  declare id: RestaurantId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare address: string

  @column()
  declare postalCode: string

  @column()
  declare city: string

  @column()
  declare country: string

  @column()
  declare phone: string

  @column()
  declare statusId: RestaurantStatusId

  @column()
  declare userId: UserId

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasOne(() => OwnershipDocument)
  declare ownership: HasOne<typeof OwnershipDocument>
}
