import Token from '#tokens/models/token'
import type User from '#users/models/user'
import { DateTime } from 'luxon'
import { TokenRelation, type TokenTypeId } from '#tokens/enums/token_type'

export class TokenRepository {
  expireTokensOfType(tokenType: TokenTypeId, user: User) {
    return user.related(TokenRelation[tokenType]).query().update({
      expiresAt: DateTime.now(),
    })
  }

  getTokenUser(token: string, tokenType: TokenTypeId): Promise<Token | null> {
    return Token.query()
      .preload('user')
      .where('token', token)
      .where('type_id', tokenType)
      .where('expiresAt', '>', DateTime.now().toSQL())
      .orderBy('createdAt', 'desc')
      .first()
  }

  generateTokenOfType(tokenType: TokenTypeId, user: User, token: string): Promise<Token> {
    return user.related(TokenRelation[tokenType]).create({
      typeId: tokenType,
      expiresAt: DateTime.now().plus({ hours: 24 }),
      token,
    })
  }

  verifyTokenOfType(tokenType: TokenTypeId, token: string): Promise<Token | null> {
    return Token.query()
      .where('expiresAt', '>', DateTime.now().toSQL())
      .where('token', token)
      .where('type_id', tokenType)
      .first()
  }
}
