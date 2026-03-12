import { Button, Group, Menu } from '@mantine/core'
import { useBookmarkQueryFilters } from '../hooks/useBookmarkQueryFilters'
import { BiSortAlt2 } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa6'
import { BookmarkListFilters, BOOKMARKS_SORT_OPTIONS } from '@/shared/constants/bookmarks'
import { DEFAULT_FILTERS } from '@/shared/constants/filters'
import { useSearchParams } from '~/hooks/useSearchParams'

const SORT_OPTIONS = [
  { value: BOOKMARKS_SORT_OPTIONS.CREATED_AT, label: 'Recently added' },
  { value: BOOKMARKS_SORT_OPTIONS.LAST_VIEWED_AT, label: 'Recently visited' },
  { value: BOOKMARKS_SORT_OPTIONS.VIEW_COUNT, label: 'Most visited' },
] as const

export const BookmarkSortMenu = () => {
  const searchParams = useSearchParams()
  const { filters } = useBookmarkQueryFilters()

  return (
    <Menu radius="md">
      <Menu.Target>
        <Button
          leftSection={<BiSortAlt2 />}
          variant="white"
          radius="md"
          size="sm"
          bd="1px solid #dee2e6"
          className="shrink-0"
        >
          Sort by
        </Button>
      </Menu.Target>
      <Menu.Dropdown miw={200}>
        {SORT_OPTIONS.map((option) => {
          const isSelected = (filters.sort ?? DEFAULT_FILTERS.SORT) === option.value

          return (
            <Menu.Item
              key={option.value}
              onClick={() => {
                searchParams.set<BookmarkListFilters>({
                  ...filters,
                  tags: filters?.tags?.map(Number).filter(Boolean),
                  page: undefined,
                  sort: option.value === DEFAULT_FILTERS.SORT ? undefined : option.value,
                })
              }}
            >
              <Group justify="space-between" gap={16}>
                {option.label}
                {isSelected && <FaCheck className="size-4" />}
              </Group>
            </Menu.Item>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}
