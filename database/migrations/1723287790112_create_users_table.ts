import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('username').notNullable().unique()
      table.string('displayed_name').notNullable()
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('phone').nullable()
      table.string('password').notNullable()
      table.integer('role_id').unsigned().notNullable().references('id').inTable('roles')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
