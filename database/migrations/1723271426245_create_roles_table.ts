import { BaseSchema } from '@adonisjs/lucid/schema'
import { UserRole, UserRoleText } from '#users/enums/user_role'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable().unique()
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          id: UserRole.Admin,
          name: UserRoleText[UserRole.Admin],
        },
        {
          id: UserRole.Pro,
          name: UserRoleText[UserRole.Pro],
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
