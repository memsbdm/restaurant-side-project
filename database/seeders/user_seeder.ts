import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#users/models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      email: 'mems@example.com',
      username: 'mems',
      displayedName: 'Mems',
      firstName: 'mehmet',
      lastName: 'badem',
      phone: '0600000000',
      password: 'secret123',
    })
  }
}
