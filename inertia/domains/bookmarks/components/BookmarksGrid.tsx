import { Grid, Stack, Text, Title } from '@mantine/core'

import { Data } from '@generated/data'
import { BookmarkItem } from './BookmarkItem'

type BookmarksGridProps = {
  bookmarks: Data.Bookmark[]
}
export const BookmarksGrid = ({ bookmarks }: BookmarksGridProps) => {
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
    </Grid>
  )
}
