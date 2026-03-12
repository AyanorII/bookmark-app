import { Grid, Pagination, Stack, Text, Title } from '@mantine/core'

import { Data } from '@generated/data'
import { BookmarkItem } from './BookmarkItem'
import type { PaginationMeta } from '../../../../app/helpers/paginator'
import { BookmarkListFilters } from '@/shared/constants/bookmarks'
import { useSearchParams } from '~/hooks/useSearchParams'

type BookmarksGridProps = {
  bookmarks: Data.Bookmark[]
  meta: PaginationMeta
}
export const BookmarksGrid = ({ bookmarks, meta }: BookmarksGridProps) => {
  const searchParams = useSearchParams()

  return (
    <Grid>
      {bookmarks.length === 0 && (
        <Grid.Col span={12}>
          <Stack align="center" mt={40} gap={8}>
            <Title size="lg">No bookmarks found</Title>
            <Text c="dimmed" size="sm">
              Start adding your favorite links to see them here.
            </Text>
          </Stack>
        </Grid.Col>
      )}
      {bookmarks.map((bookmark) => (
        <Grid.Col key={bookmark.id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
          <BookmarkItem bookmark={bookmark} />
        </Grid.Col>
      ))}
      {bookmarks.length > 0 && (
        <Grid.Col span={12} mt={32} mb={60}>
          <Pagination
            total={meta.lastPage}
            value={meta.currentPage}
            onChange={(page) => {
              searchParams.set<BookmarkListFilters>({
                page,
              })
            }}
            className="w-fit mx-auto"
          />
        </Grid.Col>
      )}
    </Grid>
  )
}
