import { BookmarkListFilters } from '@/shared/constants/bookmarks'
import { Link, LinkProps } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { Avatar, Button, Checkbox, Group, Stack, Text } from '@mantine/core'
import { LuArchive } from 'react-icons/lu'
import { RiHome6Line } from 'react-icons/ri'
import { urlFor } from '~/client'
import { useBookmarkQueryFilters } from '~/domains/bookmarks/hooks/useBookmarkQueryFilters'
import { cn } from '~/lib/utils'

type NavLinksProps = {
  tags: Data.Tag.Variants['withBookmarksCount'][]
}
export const NavLinks = ({ tags }: NavLinksProps) => {
  const { filters } = useBookmarkQueryFilters()

  const hasTagFilters =
    !!filters.tags?.length && filters.tags.map(Number).filter(Boolean).length > 0

  return (
    <>
      <Stack gap={4} mb={16}>
        <CustomLink
          href={urlFor(
            'home',
            {},
            {
              qs: {
                ...filters,
                tags: filters?.tags?.map(Number).filter(Boolean),
                archived: undefined,
              } as BookmarkListFilters,
            }
          )}
          isActive={!filters.archived}
        >
          <RiHome6Line className="size-5" />
          Home
        </CustomLink>
        <CustomLink
          href={urlFor(
            'home',
            {},
            {
              qs: {
                ...filters,
                tags: filters?.tags?.map(Number).filter(Boolean),
                archived: true,
              } as BookmarkListFilters,
            }
          )}
          isActive={filters.archived}
        >
          <LuArchive className="size-5" />
          Archived
        </CustomLink>
      </Stack>
      <Group mt={8} align="center" justify="space-between">
        <Text size="xs" className="font-bold">
          TAGS
        </Text>
        {hasTagFilters && (
          <Button
            onClick={() => {
              router.get('', { tags: [] } as BookmarkListFilters, {
                preserveState: true,
                replace: true,
              })
            }}
            variant="subtle"
            size="compact-xs"
          >
            Reset
          </Button>
        )}
      </Group>
      <Checkbox.Group
        value={filters.tags?.map(String) ?? []}
        onChange={(values) => {
          router.get('', { tags: values.map(Number).filter(Boolean) } as BookmarkListFilters, {
            preserveState: true,
            replace: true,
          })
        }}
        className="overflow-auto pr-3 mt-4"
      >
        <Stack gap={8}>
          {tags.map((tag) => (
            <Checkbox
              key={tag.id}
              value={String(tag.id)}
              size="xs"
              label={
                <Group
                  justify="space-between"
                  align="center"
                  w="100%"
                  grow
                  className="cursor-pointer"
                >
                  <Text size="sm">{tag.name}</Text>
                  <Avatar size="sm" className="w-fit grow-0!">
                    {String(tag.bookmarksCount)}
                  </Avatar>
                </Group>
              }
              styles={{
                body: {
                  alignItems: 'center',
                },
                labelWrapper: {
                  width: '100%',
                },
              }}
            />
          ))}
        </Stack>
      </Checkbox.Group>
    </>
  )
}

type Props = LinkProps & {
  isActive?: boolean
}
const CustomLink = ({ className, isActive, ...props }: Props) => {
  return (
    <Link
      className={cn(
        'rounded-md gap-2 text-sm px-2 py-1.5 hover:bg-gray-200 flex items-center',
        isActive ? 'bg-gray-300' : 'bg-transparent',
        className
      )}
      {...props}
    />
  )
}
