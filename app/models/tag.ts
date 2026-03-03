import { TagSchema } from '#database/schema'
import { hasMany, beforeSave, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import Bookmark from './bookmark.ts'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import string from '@adonisjs/core/helpers/string'
import User from './user.ts'

export default class Tag extends TagSchema {
  @beforeSave()
  static async generateSlug(tag: Tag) {
    if (tag.$dirty.name) {
      tag.slug = string.slug(tag.name.toLowerCase())
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                Relationships                               */
  /* -------------------------------------------------------------------------- */
  @manyToMany(() => Bookmark)
  declare bookmarks: ManyToMany<typeof Bookmark>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
