import User from '#users/models/user'
import { UserService } from '#users/services/user_service'
import { inject } from '@adonisjs/core'

@inject()
export class AuthService {
  constructor(private userService: UserService) {}

  attempt(login: string, password: string): Promise<User> {
    return this.userService.attempt(login, password)
  }
}
