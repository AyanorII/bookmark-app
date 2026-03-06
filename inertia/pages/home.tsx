import { Form, Link, LinkProps } from '@adonisjs/inertia/react'
import {
  AppShell,
  Avatar,
  Badge,
  Burger,
  Button,
  Center,
  Checkbox,
  Grid,
  Group,
  Menu,
  MenuDropdown,
  NavLink,
  Spoiler,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { RiHome6Line, RiSearchLine } from 'react-icons/ri'
import { LuArchive, LuEye } from 'react-icons/lu'
import { useQuery } from '@tanstack/react-query'
import { api } from '~/client'
import { router, usePage } from '@inertiajs/react'
import { InertiaProps } from '~/types'
import { Data } from '@generated/data'
import { cn } from '~/lib/utils'
import { urlFor } from '../client'
import { Logo } from '~/components/Logo'
import { FaCheck, FaRegClock } from 'react-icons/fa6'
import { BiSortAlt2 } from 'react-icons/bi'
import { NavLinks } from '~/components/NavLinks'
import { BookmarksGrid } from '~/domains/bookmarks/components/BookmarksGrid'
import { useBookmarkQueryFilters } from '~/domains/bookmarks/hooks/useBookmarkQueryFilters'
import { Header } from '~/components/Header'
import { BookmarkSortMenu } from '~/domains/bookmarks/components/BookmarkSortMenu'

type HomeProps = InertiaProps<{
  bookmarks: Data.Bookmark[]
  tags: Data.Tag.Variants['withBookmarksCount'][]
}>

export default function Home({ bookmarks, tags }: HomeProps) {
  const [opened, { toggle }] = useDisclosure()
  const { filters } = useBookmarkQueryFilters()

  const getTitle = () => {
    if (filters.search) {
      return `Results for: "${filters.search}"`
    }

    if (filters.tags?.length) {
      const tagNames = tags
        .filter((tag) => filters.tags?.includes(tag.id))
        .map((tag) => tag.name)
        .join(', ')

      return `Bookmarks tagged with: ${tagNames}`
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
        <Group justify="space-between" align="center" mb={16}>
          <Title order={1} size="xl">
            {getTitle()}
          </Title>
          <BookmarkSortMenu />
        </Group>
        <BookmarksGrid bookmarks={bookmarks} />
      </AppShell.Main>
    </AppShell>
  )
}
