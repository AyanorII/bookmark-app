import { router } from '@inertiajs/react'
import { Button, Group, Menu } from '@mantine/core'
import { useBookmarkQueryFilters } from '../hooks/useBookmarkQueryFilters'
import { BiSortAlt2 } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa6'

const SORT_OPTIONS = [
  { value: 'added', label: 'Recently added' },
  { value: 'visited', label: 'Recently visited' },
  { value: 'views', label: 'Most visited' },
]

export const BookmarkSortMenu = () => {
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
        >
          Sort by
        </Button>
      </Menu.Target>
      <Menu.Dropdown miw={200}>
        {SORT_OPTIONS.map((option) => {
          const defaultSort = 'added'
          const isSelected = (filters.sort ?? defaultSort) === option.value

          return (
            <Menu.Item
              key={option.value}
              onClick={() => {
                router.get(
                  '',
                  { ...filters, sort: option.value === defaultSort ? undefined : option.value },
                  { preserveState: true, replace: true }
                )
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
