import type { UserRoleId } from '#users/enums/user_role'

export interface StoreProDto {
  firstName: string
  lastName: string
  username: string
  displayedName: string
  phone: string
  email: string
  password: string
  roleId: UserRoleId
}
