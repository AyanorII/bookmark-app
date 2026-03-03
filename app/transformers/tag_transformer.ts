import { BaseTransformer } from '@adonisjs/core/transformers'
import type Tag from '#models/tag'

export default class TagTransformer extends BaseTransformer<Tag> {
  toObject() {
    return this.pick(this.resource, ['id', 'name', 'slug'])
  }

  async withBookmarksCount() {
    return { ...this.toObject(), bookmarksCount: this.resource.$extras.bookmarks_count || 0 }
  }
}
