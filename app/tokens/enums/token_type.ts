export const TokenType = {
  VerifyEmail: 1,
} as const

export type TokenTypeId = (typeof TokenType)[keyof typeof TokenType]

export const TokenRelation = {
  [TokenType.VerifyEmail]: 'verifyEmailTokens',
} as const

export const tokenTypesDbValues = [
  {
    id: TokenType.VerifyEmail,
    name: 'Email verification',
  },
]
