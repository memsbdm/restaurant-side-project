import User from '#users/models/user'
import type { StoreProDto } from '#users/dtos/store_pro_dto'

export class UserRepository {
  store(user: StoreProDto): Promise<User> {
    return User.create(user)
  }

  attempt(uid: string, password: string): Promise<User> {
    return User.verifyCredentials(uid, password)
  }

  async verifyEmail(user: User): Promise<void> {
    user.isEmailVerified = true
    await user.save()
  }

  findByEmail(email: string): Promise<User | null> {
    return User.findBy('email', email)
  }

  changePassword(user: User, password: string): Promise<void> {
    return user.merge({ password }).save()
  }
}
