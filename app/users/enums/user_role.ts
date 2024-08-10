export const UserRole = {
  Admin: 1,
  Pro: 2,
} as const

export type UserRoleId = (typeof UserRole)[keyof typeof UserRole]

export const UserRoleText = {
  [UserRole.Admin]: 'Admin',
  [UserRole.Pro]: 'Pro',
}
