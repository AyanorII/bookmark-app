import type { HttpContext } from '@adonisjs/core/http'

import { type BookmarkListFilters, BookmarkService } from '#services/bookmark_service'
import { TagService } from '#services/tag_service'
import BookmarkTransformer from '#transformers/bookmark_transformer'
import TagTransformer from '#transformers/tag_transformer'

export default class HomeController {
  async index({ auth, inertia, request }: HttpContext) {
    const user = auth.user!

    const query = request.qs()
    const filters: BookmarkListFilters = {
      tags: (query.tags || []).map(Number),
      archived: query.archived === 'true',
      search: query.search || '',
      sort: (query.sort as BookmarkListFilters['sort']) || 'added',
    }

    const [bookmarks, tags] = await Promise.all([
      BookmarkService.listForUser(user.id, filters),
      TagService.listForUser(user.id, { archived: filters.archived }),
    ])

    return inertia.render('home', {
      bookmarks: BookmarkTransformer.transform(bookmarks),
      tags: TagTransformer.transform(tags).useVariant('withBookmarksCount'),
    })
  }
}
