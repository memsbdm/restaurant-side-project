import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import { Opaque } from '@adonisjs/core/types/helpers'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Role from '#users/models/role'
import type { UserRoleId } from '#users/enums/user_role'
import { DateTime } from 'luxon'
import Token from '#tokens/models/token'
import { TokenType } from '#tokens/enums/token_type'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email', 'username'],
  passwordColumnName: 'password',
})

export type UserId = Opaque<'UserId', string>

export default class User extends compose(BaseModel, AuthFinder) {
  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)

  @column({ isPrimary: true })
  declare id: UserId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare email: string

  @column()
  declare username: string

  @column()
  declare displayedName: string

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare phone: string | null

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare isEmailVerified: boolean

  @column()
  declare roleId: UserRoleId

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasMany(() => Token, {
    onQuery: (query) => {
      query.where('typeId', TokenType.VerifyEmail)
    },
  })
  declare verifyEmailTokens: HasMany<typeof Token>
}
