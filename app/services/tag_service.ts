import Tag from '#models/tag'

export type TagListFilters = {
  archived?: boolean
  search?: string
}

export class TagService {
  static async listForUser(userId: number, filters: TagListFilters = {}) {
    const query = Tag.query()
      .where('user_id', userId)
      .withCount('bookmarks', (b) => b.where('is_archived', filters.archived ?? false))
      .orderBy('name', 'asc')

    if (filters.search) {
      query.andWhere('name', 'like', `%${filters.search}%`)
    }

    return query
  }
}
