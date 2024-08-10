import User from '#users/models/user'
import type { StoreProDto } from '#users/dtos/store_pro_dto'

export class UserRepository {
  store(user: StoreProDto): Promise<User> {
    return User.create(user)
  }

  attempt(uid: string, password: string): Promise<User> {
    return User.verifyCredentials(uid, password)
  }
}
