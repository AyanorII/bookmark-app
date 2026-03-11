import type { HttpContext } from '@adonisjs/core/http'

import { TagService } from '#services/tag_service'
import BookmarkTransformer from '#transformers/bookmark_transformer'
import TagTransformer from '#transformers/tag_transformer'
import { getPaginationMeta } from '../helpers/paginator.ts'
import { BookmarkService } from '#services/bookmark_service'

export default class HomeController {
  async index({ auth, inertia, request }: HttpContext) {
    const user = auth.user!

    const query = request.qs()
    const filters = BookmarkService.getQueryFilters(query)

    const [bookmarksPaginator, tags] = await Promise.all([
      BookmarkService.listForUser(user.id, filters),
      TagService.listForUser(user.id, { archived: filters.archived }),
    ])

    return inertia.render('home', {
      bookmarks: BookmarkTransformer.transform(bookmarksPaginator.all()),
      tags: TagTransformer.transform(tags).useVariant('withBookmarksCount'),
      meta: getPaginationMeta(bookmarksPaginator),
    })
  }
}
