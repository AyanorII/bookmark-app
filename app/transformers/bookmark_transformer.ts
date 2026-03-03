import { BaseTransformer } from '@adonisjs/core/transformers'
import type Bookmark from '#models/bookmark'

export default class BookmarkTransformer extends BaseTransformer<Bookmark> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'title',
      'url',
      'favicon',
      'description',
      'viewCount',
      'isPinned',
      'isArchived',
      'archivedAt',
      'lastViewedAt',
    ])
  }
}
