import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { useClipboard, useDisclosure } from '@mantine/hooks'
import { BsPinAngle, BsPinAngleFill, BsThreeDotsVertical } from 'react-icons/bs'
import { LuArchive, LuCopy, LuExternalLink, LuTrash } from 'react-icons/lu'
import { useToggleBookmarkArchiveMutation } from '../api/mutations/useToggleBookmarkArchiveMutation'
import { useToggleBookmarkPinMutation } from '../api/mutations/useToggleBookmarkPinMutation'
import { useDeleteBookmarkMutation } from '../api/mutations/useDeleteBookmarkMutation'
import { BookmarkDeleteModal } from './BookmarkDeleteModal'
import { BookmarkArchiveModal } from './BookmarkArchiveModal'
import { BookmarkEditModal } from './BookmarkEditModal'
import { Button, Menu } from '@mantine/core'
import { FaRegEdit } from 'react-icons/fa'
import { useMemo } from 'react'
import { useIncrementBookmarkViewCountMutation } from '../api/mutations/useIncrementBookmarkViewCountMutation copy'

type Action = {
  id: string
  label: string
  icon: React.ReactNode
  onClick: () => void
}

type BookmarkMenuProps = {
  bookmark: Data.Bookmark
}
export const BookmarkMenu = ({ bookmark }: BookmarkMenuProps) => {
  const clipboard = useClipboard()

  const [isArchiveModalOpen, { open: openArchiveModal, close: closeArchiveModal }] = useDisclosure()
  const [isBookmarkModalOpen, { open: openBookmarkModal, close: closeBookmarkModal }] =
    useDisclosure()
  const [isDeleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure()

  const mutationOptions = {
    onSuccess: () => {
      router.reload({ only: ['bookmarks'] })
    },
  }

  const { mutate: incrementViewCount } = useIncrementBookmarkViewCountMutation(mutationOptions)
  const { mutate: togglePin } = useToggleBookmarkPinMutation(mutationOptions)

  const ACTIONS: Action[] = useMemo(
    () => [
      {
        id: 'visit',
        label: 'Visit',
        icon: <LuExternalLink />,
        onClick: () =>
          incrementViewCount({
            params: { id: bookmark.id },
          }),
      },
      {
        id: 'copy',
        label: 'Copy URL',
        icon: <LuCopy />,
        onClick: () => clipboard.copy(bookmark.url),
      },
      {
        id: 'pin',
        label: bookmark.isPinned ? 'Unpin' : 'Pin',
        icon: bookmark.isPinned ? <BsPinAngleFill /> : <BsPinAngle />,
        onClick: () => {
          togglePin({ params: { id: bookmark.id } })
        },
      },
      { id: 'edit', label: 'Edit', icon: <FaRegEdit />, onClick: openBookmarkModal },
      {
        id: 'archive',
        label: 'Archive/Unarchive',
        icon: <LuArchive />,
        onClick: openArchiveModal,
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: <LuTrash />,
        onClick: openDeleteModal,
      },
    ],
    [
      bookmark,
      clipboard,
      incrementViewCount,
      togglePin,
      openBookmarkModal,
      openArchiveModal,
      openDeleteModal,
    ]
  )

  return (
    <>
      <Menu>
        <Menu.Target>
          <Button size="compact-sm" variant="outline" flex="0 0 auto" radius="md">
            <BsThreeDotsVertical />
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {ACTIONS.map((action) => (
            <Menu.Item key={action.id} onClick={action.onClick} leftSection={action.icon} px={8}>
              {action.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
      <BookmarkArchiveModal
        bookmark={bookmark}
        isOpen={isArchiveModalOpen}
        onClose={closeArchiveModal}
      />
      <BookmarkEditModal
        bookmark={bookmark}
        isOpen={isBookmarkModalOpen}
        onClose={closeBookmarkModal}
      />
      <BookmarkDeleteModal
        bookmark={bookmark}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      />
    </>
  )
}
