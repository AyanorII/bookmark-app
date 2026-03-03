import { BookmarkSchema } from '#database/schema'
import { belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.ts'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Tag from './tag.ts'

export default class Bookmark extends BookmarkSchema {
  /* -------------------------------------------------------------------------- */
  /*                                   Columns                                  */
  /* -------------------------------------------------------------------------- */
  @column({
    consume: (value) => !!value,
    prepare: (value) => (value ? 1 : 0),
  })
  declare isPinned: boolean

  @column({
    consume: (value) => !!value,
    prepare: (value) => (value ? 1 : 0),
  })
  declare isArchived: boolean

  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  incrementViewCount() {
    this.viewCount += 1
    this.lastViewedAt = DateTime.now()
  }

  pin() {
    this.isPinned = true
  }

  unpin() {
    this.isPinned = false
  }

  archive() {
    this.isArchived = true
    this.archivedAt = DateTime.now()
  }

  unarchive() {
    this.isArchived = false
    this.archivedAt = null
  }

  /* -------------------------------------------------------------------------- */
  /*                                Relationships                               */
  /* -------------------------------------------------------------------------- */
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Tag)
  declare tags: ManyToMany<typeof Tag>
}
