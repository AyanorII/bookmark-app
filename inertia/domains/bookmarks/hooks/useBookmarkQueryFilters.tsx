import { BookmarkListFilters } from '@/shared/constants/bookmarks'
import { useSearchParams } from '~/hooks/useSearchParams'

export const useBookmarkQueryFilters = () => {
  const searchParams = useSearchParams()
  const { archived, tags, search, sort } = searchParams.query

  const defaultFilters: BookmarkListFilters = {
    archived: undefined,
    tags: [],
    search: undefined,
    sort: undefined,
    page: undefined,
    perPage: undefined,
  }

  const filters: BookmarkListFilters = {
    archived: typeof archived === 'boolean' ? archived : defaultFilters.archived,
    tags: Array.isArray(tags) ? tags.map(Number) : defaultFilters.tags,
    search: (search as string) ?? defaultFilters.search,
    sort: (sort as keyof BookmarkListFilters['sort']) ?? defaultFilters.sort,
  }

  return { filters, defaultFilters }
}
