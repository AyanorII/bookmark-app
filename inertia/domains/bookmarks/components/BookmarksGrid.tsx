import { Badge, Grid, Spoiler, Stack, Text, Title, Tooltip } from '@mantine/core'
import {
  BookmarkCard,
  BookmarkCardBody,
  BookmarkCardFooter,
  BookmarkCardHeader,
  BookmarkDescription,
  BookmarkFavicon,
  BookmarkStat,
  BookmarkTags,
  BookmarkTitle,
  BookmarkURL,
} from './BookmarkCard'
import { FaRegClock } from 'react-icons/fa6'
import { CiCalendar } from 'react-icons/ci'
import { LuEye } from 'react-icons/lu'
import { MdPushPin } from 'react-icons/md'
import { Data } from '@generated/data'
import { api } from '~/client'
import { useMutation } from '@tanstack/react-query'
import { router } from '@inertiajs/react'
import { BookmarkMenu } from './BookmarkMenu'

type BookmarksGridProps = {
  bookmarks: Data.Bookmark[]
}
export const BookmarksGrid = ({ bookmarks }: BookmarksGridProps) => {
  const incrementViewCount = useMutation(
    api.bookmarks.view.mutationOptions({
      onSuccess: () => {
        router.reload({ only: ['bookmarks'] })
      },
    })
  )

  const getFormattedDate = (d: string) => {
    const date = new Date(d)

    const isSameYear = date.getFullYear() === new Date().getFullYear()

    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: isSameYear ? undefined : 'numeric',
    })

    return formatter.format(date)
  }

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
          <BookmarkCard h="100%">
            <BookmarkCardHeader>
              <BookmarkFavicon src={bookmark.favicon} />
              <Stack gap={0} flex="1 1 auto" className="overflow-hidden">
                <BookmarkTitle>{bookmark.title}</BookmarkTitle>
                <BookmarkURL
                  onClick={() => incrementViewCount.mutate({ params: { id: bookmark.id } })}
                  href={bookmark.url}
                  truncate="end"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {bookmark.url}
                </BookmarkURL>
              </Stack>
              <BookmarkMenu bookmark={bookmark} />
            </BookmarkCardHeader>
            <BookmarkCardBody flex="1 1 auto">
              <Spoiler
                maxHeight={60}
                showLabel={<Text size="xs">Show more</Text>}
                hideLabel={<Text size="xs">Show less</Text>}
              >
                <BookmarkDescription lineClamp={3}>{bookmark.description}</BookmarkDescription>
              </Spoiler>
              {bookmark.tags.length > 0 && (
                <BookmarkTags>
                  {bookmark.tags.map((tag) => (
                    <Badge key={tag.id} size="xs" radius="sm" variant="light">
                      {tag.name}
                    </Badge>
                  ))}
                </BookmarkTags>
              )}
            </BookmarkCardBody>
            <BookmarkCardFooter>
              <Tooltip label="Total views" withArrow>
                <BookmarkStat icon={<LuEye />} value={bookmark.viewCount} />
              </Tooltip>
              <Tooltip label="Last visited" withArrow>
                <BookmarkStat
                  icon={<FaRegClock className="size-3" />}
                  value={bookmark.lastViewedAt ? getFormattedDate(bookmark.lastViewedAt) : 'Never'}
                />
              </Tooltip>
              <Tooltip label="Created at" withArrow>
                <BookmarkStat icon={<CiCalendar />} value={getFormattedDate(bookmark.createdAt!)} />
              </Tooltip>
              {bookmark.isPinned && <MdPushPin className="ml-auto" />}
            </BookmarkCardFooter>
          </BookmarkCard>
        </Grid.Col>
      ))}
    </Grid>
  )
}
