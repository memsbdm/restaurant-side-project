import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#users/models/user'
import { UserRole } from '#users/enums/user_role'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'mems@example.com',
        username: 'mems',
        displayedName: 'Mems',
        firstName: 'mehmet',
        lastName: 'badem',
        phone: '0600000000',
        password: 'secret123',
        roleId: UserRole.Admin,
      },
      {
        email: 'restaurant@example.com',
        username: 'restaurant',
        displayedName: 'Restaurant',
        firstName: 'john',
        lastName: 'doe',
        phone: '0700000000',
        password: 'secret123',
        roleId: UserRole.Pro,
      },
    ])
  }
}
