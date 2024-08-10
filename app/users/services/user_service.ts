import { inject } from '@adonisjs/core'
import { UserRepository } from '#users/repositories/user_repository'
import type User from '#users/models/user'
import type { StoreProDto } from '#users/dtos/store_pro_dto'

@inject()
export class UserService {
  constructor(private repository: UserRepository) {}

  async register(user: StoreProDto): Promise<User> {
    return this.repository.store(user)
  }
}
