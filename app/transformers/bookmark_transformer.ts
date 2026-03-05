import { BaseTransformer } from '@adonisjs/core/transformers'
import type Bookmark from '#models/bookmark'
import TagTransformer from './tag_transformer.ts'

export default class BookmarkTransformer extends BaseTransformer<Bookmark> {
  toObject() {
    const bookmarkSerializer = this.pick(this.resource, [
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
      'createdAt',
    ])

    return {
      ...bookmarkSerializer,
      // tags: this.resource.tags
      //   ? TagTransformer.transform(this.resource.tags)
      //   : TagTransformer.transform([]),
      tags: TagTransformer.transform(this.resource.tags || []),
    }
  }
}
