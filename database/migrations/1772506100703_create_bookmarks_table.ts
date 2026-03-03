import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookmarks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('url').notNullable()
      table.string('favicon')
      table.text('description')
      table.integer('view_count').defaultTo(0).notNullable()

      table.boolean('is_pinned').defaultTo(false).notNullable()
      table.boolean('is_archived').defaultTo(false).notNullable()

      table.timestamp('archived_at')
      table.timestamp('last_viewed_at')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
