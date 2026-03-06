import { Burger, Button, Group, Modal, Text, TextInput } from '@mantine/core'
import { Logo } from './Logo'
import { RiSearchLine } from 'react-icons/ri'
import { router } from '@inertiajs/react'
import { useBookmarkQueryFilters } from '~/domains/bookmarks/hooks/useBookmarkQueryFilters'
import { FaPlus } from 'react-icons/fa6'
import { useDisclosure } from '@mantine/hooks'
import { BookmarkForm } from '~/domains/bookmarks/components/BookmarkForm'
import { toast } from 'sonner'
import { UserMenu } from './UserMenu'

type Props = {
  isOpened: boolean
  onToggle: () => void
}
export const Header = ({ isOpened, onToggle }: Props) => {
  const { filters } = useBookmarkQueryFilters()

  const [isBookmarkModalOpen, { open: openBookmarkModal, close: closeBookmarkModal }] =
    useDisclosure()

  return (
    <Group h="100%" px="md" gap={8}>
      <Burger opened={isOpened} onClick={onToggle} hiddenFrom="sm" size="sm" />
      <Logo className="hidden md:block" />
      <TextInput
        defaultValue={filters.search ?? undefined}
        name="search"
        placeholder="Search by title"
        leftSection={<RiSearchLine />}
        maw={320}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const value = e.currentTarget.value

            router.get(
              '',
              { ...filters, search: value || undefined },
              {
                preserveState: true,
                replace: true,
              }
            )
          }
        }}
      />
      <Button
        onClick={openBookmarkModal}
        leftSection={<FaPlus />}
        ml="auto"
        pr={{ base: 3, sm: 'md' }}
      >
        <Text fw={500} fz="sm" display={{ base: 'none', sm: 'block' }}>
          Add Bookmark
        </Text>
      </Button>
      <UserMenu />
      <Modal.Root opened={isBookmarkModalOpen} onClose={closeBookmarkModal} centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header pb={8}>
            <Modal.Title fw="bold" fz="h3">
              Add Bookmark
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <Text size="sm" c="dimmed" mb="md">
              Save a link with details to keep your collection organized. You can leave the title
              and description empty — we will try to fetch them for you.
            </Text>
            <BookmarkForm
              onSuccess={() => {
                closeBookmarkModal()
                toast.success('Bookmark added successfully!')
              }}
              onCancel={closeBookmarkModal}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </Group>
  )
}
