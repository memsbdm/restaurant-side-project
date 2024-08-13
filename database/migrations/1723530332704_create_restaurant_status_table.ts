import { restaurantStatusDbValues } from '#restaurants/enums/restaurant_status'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'restaurant_status'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable().unique()
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert(restaurantStatusDbValues)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
