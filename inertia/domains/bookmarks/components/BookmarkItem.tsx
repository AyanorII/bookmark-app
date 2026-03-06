import { Data } from '@generated/data'
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
import { Badge, Spoiler, Stack, Text, Tooltip } from '@mantine/core'
import { BookmarkMenu } from './BookmarkMenu'
import { LuEye } from 'react-icons/lu'
import { FaRegClock } from 'react-icons/fa6'
import { CiCalendar } from 'react-icons/ci'
import { useIncrementBookmarkViewCountMutation } from '../api/mutations/useIncrementBookmarkViewCountMutation copy'
import { router } from '@inertiajs/react'
import { useDisclosure } from '@mantine/hooks'

type BookmarkItemProps = {
  bookmark: Data.Bookmark
}

export const BookmarkItem = ({ bookmark }: BookmarkItemProps) => {
  const [isDescriptionExpanded, { toggle: toggleDescriptionExpanded }] = useDisclosure()

  const { mutate: incrementViewCount } = useIncrementBookmarkViewCountMutation({
    onSuccess: () => {
      router.reload({ only: ['bookmarks'] })
    },
  })

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

  const stats = [
    {
      id: 'views',
      icon: <LuEye className="size-3" />,
      value: bookmark.viewCount,
      label: 'Total views',
    },
    {
      id: 'lastViewedAt',
      icon: <FaRegClock className="size-3" />,
      value: bookmark.lastViewedAt ? getFormattedDate(bookmark.lastViewedAt) : 'Never',
      label: 'Last visited',
    },
    {
      id: 'createdAt',
      icon: <CiCalendar className="size-3" />,
      value: getFormattedDate(bookmark.createdAt!),
      label: 'Created at',
    },
  ]

  return (
    <BookmarkCard h="100%">
      <BookmarkCardHeader>
        <BookmarkFavicon src={bookmark.favicon} />
        <Stack gap={0} flex="1 1 auto" className="overflow-hidden">
          <BookmarkTitle>{bookmark.title}</BookmarkTitle>
          <BookmarkURL
            onClick={() => incrementViewCount({ params: { id: bookmark.id } })}
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
          expanded={isDescriptionExpanded}
          onExpandedChange={toggleDescriptionExpanded}
          maxHeight={60}
          showLabel={<Text size="xs">Show more</Text>}
          hideLabel={<Text size="xs">Show less</Text>}
        >
          <BookmarkDescription lineClamp={isDescriptionExpanded ? undefined : 3}>
            {bookmark.description}
          </BookmarkDescription>
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
        {stats.map((stat) => (
          <Tooltip key={stat.id} label={stat.label} withArrow>
            <BookmarkStat icon={stat.icon} value={stat.value} />
          </Tooltip>
        ))}
      </BookmarkCardFooter>
    </BookmarkCard>
  )
}
