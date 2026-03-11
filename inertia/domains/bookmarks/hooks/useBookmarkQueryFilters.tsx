import { BookmarkListFilters } from '@/shared/constants/bookmarks'
import { usePage } from '@inertiajs/react'

export const useBookmarkQueryFilters = () => {
  const { url } = usePage()

  const qs = new URLSearchParams(url.split('?')[1] ?? '')

  const defaultFilters: BookmarkListFilters = {
    archived: undefined,
    tags: [],
    search: undefined,
    sort: undefined,
  }

  const filters: BookmarkListFilters = {
    archived: qs.get('archived') ? qs.get('archived') === 'true' : defaultFilters.archived,
    tags: (qs.getAll('tags[]') ?? []).map(Number) ?? defaultFilters.tags,
    search: qs.get('search') ?? defaultFilters.search,
    sort: (qs.get('sort') as keyof BookmarkListFilters['sort']) ?? defaultFilters.sort,
  }

  return { filters, defaultFilters }
}
