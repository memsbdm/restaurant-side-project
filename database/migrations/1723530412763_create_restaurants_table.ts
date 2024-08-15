import { RestaurantStatus } from '#restaurants/enums/restaurant_status'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'restaurants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('name').notNullable()
      table.string('address').notNullable()
      table.string('postal_code').notNullable()
      table.string('city').notNullable()
      table.string('country').notNullable()
      table.string('phone').notNullable()
      table
        .integer('status_id')
        .unsigned()
        .references('id')
        .inTable('restaurant_status')
        .defaultTo(RestaurantStatus.Pending)
        .onDelete('CASCADE')
      table.uuid('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
