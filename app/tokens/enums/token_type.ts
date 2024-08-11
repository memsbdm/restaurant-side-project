export const TokenType = {
  VerifyEmail: 1,
  ResetPassword: 2,
} as const

export type TokenTypeId = (typeof TokenType)[keyof typeof TokenType]

export const TokenRelation = {
  [TokenType.VerifyEmail]: 'verifyEmailTokens',
  [TokenType.ResetPassword]: 'resetPasswordTokens',
} as const

export const tokenTypesDbValues = [
  {
    id: TokenType.VerifyEmail,
    name: 'Email verification',
  },
  {
    id: TokenType.ResetPassword,
    name: 'Reset password',
  },
]
