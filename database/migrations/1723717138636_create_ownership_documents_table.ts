import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ownership_documents'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table
        .uuid('restaurant_id')
        .primary()
        .references('id')
        .inTable('restaurants')
        .onDelete('CASCADE')
      table.string('key').notNullable()
      table.string('url').notNullable()
      table.boolean('is_confirmed').defaultTo(false)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
