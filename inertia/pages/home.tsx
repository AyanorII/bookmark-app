import { AppShell, Group, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { InertiaProps } from '~/types'
import { Data } from '@generated/data'
import { NavLinks } from '~/components/NavLinks'
import { BookmarksGrid } from '~/domains/bookmarks/components/BookmarksGrid'
import { useBookmarkQueryFilters } from '~/domains/bookmarks/hooks/useBookmarkQueryFilters'
import { Header } from '~/components/Header'
import { BookmarkSortMenu } from '~/domains/bookmarks/components/BookmarkSortMenu'
import type { PaginationMeta } from '../../app/helpers/paginator'

type HomeProps = InertiaProps<{
  bookmarks: Data.Bookmark[]
  tags: Data.Tag.Variants['withBookmarksCount'][]
  meta: PaginationMeta
}>

export default function Home({ bookmarks, tags, meta }: HomeProps) {
  const [opened, { toggle }] = useDisclosure()
  const { filters } = useBookmarkQueryFilters()

  const getTitle = () => {
    if (filters.search) {
      return `Results for: "${filters.search}"`
    }

    if (filters.tags?.length) {
      const tagNames = tags.filter((tag) => filters.tags?.includes(tag.id)).map((tag) => tag.name)
      const formatter = new Intl.ListFormat('en', { style: 'long', type: 'disjunction' })

      return `Bookmarks tagged with: ${formatter.format(tagNames)}`
    }

    if (filters.archived) {
      return 'Archived Bookmarks'
    }

    return 'All Bookmarks'
  }

  return (
    <AppShell
      padding="md"
      header={{ height: 80 }}
      navbar={{
        width: { base: 200, md: 300, lg: 298 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Header isOpened={opened} onToggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLinks tags={tags} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Group justify="space-between" align="center" mb={16} wrap="nowrap">
          <Title order={1} size="xl">
            {getTitle()}
          </Title>
          <BookmarkSortMenu />
        </Group>
        <BookmarksGrid bookmarks={bookmarks} meta={meta} />
      </AppShell.Main>
    </AppShell>
  )
}
