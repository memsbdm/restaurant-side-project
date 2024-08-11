export const UserRole = {
  Admin: 1,
  Pro: 2,
} as const

export type UserRoleId = (typeof UserRole)[keyof typeof UserRole]

export const UserRoleText = {
  [UserRole.Admin]: 'Admin',
  [UserRole.Pro]: 'Pro',
} as const

export const rolesDbValues = [
  {
    id: UserRole.Admin,
    name: UserRoleText[UserRole.Admin],
  },
  {
    id: UserRole.Pro,
    name: UserRoleText[UserRole.Pro],
  },
]
