import Bookmark from '#models/bookmark'
import BookmarkPolicy from '#policies/bookmark_policy'
import BookmarkTransformer from '#transformers/bookmark_transformer'
import {
  createBookmarkValidator,
  updateBookmarkTagsValidator,
  updateBookmarkValidator,
} from '#validators/bookmark'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class BookmarksController {
  async index({ serialize, auth }: HttpContext) {
    const user = auth.user!
    const bookmarks = await Bookmark.query().where('user_id', user.id).orderBy('created_at', 'desc')

    return serialize(BookmarkTransformer.transform(bookmarks))
  }

  async show({ params, serialize, auth }: HttpContext) {
    const user = auth.user!
    const bookmark = await this.findBookmarkById(params.id, user.id)

    return serialize(BookmarkTransformer.transform(bookmark))
  }

  async store({ bouncer, serialize, auth, request }: HttpContext) {
    const user = auth.user!

    await bouncer.with(BookmarkPolicy).authorize('create')

    const payload = await request.validateUsing(createBookmarkValidator)
    const bookmark = await Bookmark.create({ ...payload, userId: user.id })

    return serialize(BookmarkTransformer.transform(bookmark))
  }

  async update({ params, auth, request, serialize, bouncer }: HttpContext) {
    const user = auth.user!

    const bookmark = await this.findBookmarkById(params.id, user.id)
    await bouncer.with(BookmarkPolicy).authorize('edit', bookmark)

    const payload = await request.validateUsing(updateBookmarkValidator)
    await bookmark.merge(payload).save()

    return serialize(BookmarkTransformer.transform(bookmark))
  }

  async destroy({ params, auth, bouncer, response }: HttpContext) {
    const user = auth.user!

    const bookmark = await this.findBookmarkById(params.id, user.id)
    await bouncer.with(BookmarkPolicy).authorize('delete', bookmark)

    await bookmark.delete()

    return response.noContent()
  }

  async togglePin({ params, bouncer, auth, serialize }: HttpContext) {
    const user = auth.user!

    const bookmark = await this.findBookmarkById(params.id, user.id)
    await bouncer.with(BookmarkPolicy).authorize('edit', bookmark)

    bookmark.isPinned ? bookmark.unpin() : bookmark.pin()
    await bookmark.save()

    return serialize(BookmarkTransformer.transform(bookmark))
  }

  async toggleArchive({ params, bouncer, auth, serialize }: HttpContext) {
    const user = auth.user!

    const bookmark = await this.findBookmarkById(params.id, user.id)
    await bouncer.with(BookmarkPolicy).authorize('edit', bookmark)

    bookmark.isArchived ? bookmark.unarchive() : bookmark.archive()
    await bookmark.save()

    return serialize(BookmarkTransformer.transform(bookmark))
  }

  async incrementViewCount({ params, auth, serialize }: HttpContext) {
    const user = auth.user!

    await Bookmark.query()
      .where('id', params.id)
      .andWhere('user_id', user.id)
      .update({
        last_viewed_at: DateTime.now().toSQL(),
        view_count: db.raw('view_count + 1'),
      })

    const bookmark = await this.findBookmarkById(params.id, user.id)

    return serialize(BookmarkTransformer.transform(bookmark))
  }

  async updateTags({ params, auth, request, serialize, response }: HttpContext) {
    const user = auth.user!

    const payload = await request.validateUsing(updateBookmarkTagsValidator)

    const allowed = await user.related('tags').query().whereIn('id', payload.tags).select('id')
    const allowedIds = allowed.map((tag) => tag.id)

    if (allowedIds.length !== payload.tags.length) {
      return response.forbidden({ message: 'One or more tags are invalid' })
    }

    const bookmark = await this.findBookmarkById(params.id, user.id)
    await bookmark.related('tags').sync(allowedIds)

    await bookmark.load('tags')

    return serialize(BookmarkTransformer.transform(bookmark))
  }

  /* -------------------------------------------------------------------------- */
  /*                               Private methods                              */
  /* -------------------------------------------------------------------------- */

  private async findBookmarkById(id: string, userId: number) {
    return Bookmark.query().where('id', id).andWhere('user_id', userId).firstOrFail()
  }
}
