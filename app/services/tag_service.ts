import Tag from '#models/tag'

export type TagListFilters = {
  archived?: boolean
  search?: string
}

export class TagService {
  static async listForUser(userId: number, filters: TagListFilters = {}) {
    const query = Tag.query()
      .where('user_id', userId)
      .if(filters.search, (q) => q.where('name', 'like', `%${filters.search}%`))
      .orderBy('name', 'asc')
      .withCount('bookmarks', (b) => b.where('is_archived', filters.archived ?? false))

    return query
  }
}
