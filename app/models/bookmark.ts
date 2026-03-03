import { BookmarkSchema } from '#database/schema'
import { beforeSave, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Bookmark extends BookmarkSchema {
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

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
