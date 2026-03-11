export const BOOKMARKS_SORT_OPTIONS = {
  CREATED_AT: 'created_at',
  LAST_VIEWED_AT: 'last_viewed_at',
  VIEW_COUNT: 'view_count',
} as const
export type BookmarksSortOption =
  (typeof BOOKMARKS_SORT_OPTIONS)[keyof typeof BOOKMARKS_SORT_OPTIONS]

export type BookmarkListFilters = {
  archived?: boolean
  tags?: number[]
  search?: string
  sort?: BookmarksSortOption
  pinned?: boolean
  page?: number
  perPage?: number
}
