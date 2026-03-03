import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookmark_tag'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('bookmark_id')
        .notNullable()
        .unsigned()
        .references('bookmarks.id')
        .onDelete('CASCADE')

      table.integer('tag_id').notNullable().unsigned().references('tags.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['bookmark_id', 'tag_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
