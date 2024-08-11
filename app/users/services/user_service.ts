import { inject } from '@adonisjs/core'
import { UserRepository } from '#users/repositories/user_repository'
import type User from '#users/models/user'
import type { StoreProDto } from '#users/dtos/store_pro_dto'
import { VerifyEmailService } from '#tokens/services/verify_email_service'

@inject()
export class UserService {
  constructor(
    private repository: UserRepository,
    private verifyEmailService: VerifyEmailService
  ) {}

  async register(user: StoreProDto): Promise<User> {
    const createdUser = await this.repository.store(user)
    await this.verifyEmailService.sendTo(createdUser)

    return createdUser
  }

  attempt(login: string, password: string): Promise<User> {
    return this.repository.attempt(login, password)
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email)
  }

  verifyEmail(user: User): Promise<void> {
    return this.repository.verifyEmail(user)
  }

  changePassword(user: User, password: string): Promise<void> {
    return this.repository.changePassword(user, password)
  }
}
