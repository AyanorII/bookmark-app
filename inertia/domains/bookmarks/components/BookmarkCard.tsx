import {
  Anchor,
  AnchorProps,
  Avatar,
  AvatarProps,
  Button,
  Card,
  CardProps,
  Group,
  GroupProps,
  Menu,
  Modal,
  Stack,
  StackProps,
  Text,
  TextProps,
  Title,
  TitleProps,
} from '@mantine/core'
import React from 'react'
import { LuArchive, LuCopy, LuExternalLink, LuTrash } from 'react-icons/lu'
import { FaRegEdit } from 'react-icons/fa'
import { BsPinAngle, BsPinAngleFill, BsThreeDotsVertical } from 'react-icons/bs'
import { cn } from '~/lib/utils'
import { Data } from '@generated/data'
import { useMutation } from '@tanstack/react-query'
import { api } from '~/client'
import { useClipboard, useDisclosure } from '@mantine/hooks'
import { router } from '@inertiajs/react'
import { BookmarkForm } from './BookmarkForm'
import { toast } from 'sonner'

export const BookmarkCard = (props: CardProps) => {
  return <Card withBorder radius="lg" py={0} px={16} {...props} />
}

export const BookmarkCardHeader = ({ className, ...props }: GroupProps) => {
  return (
    <Group
      gap={12}
      align="center"
      py={14}
      wrap="nowrap"
      className={cn('border-b border-b-gray-300', className)}
      {...props}
    />
  )
}

export const BookmarkCardBody = (props: StackProps) => {
  return <Stack gap={16} my={16} {...props} />
}

export const BookmarkCardFooter = ({ className, ...props }: GroupProps) => {
  return (
    <Group
      gap={16}
      align="center"
      py={12}
      className={cn('border-t border-t-gray-200', className)}
      {...props}
    />
  )
}

export const BookmarkFavicon = (props: AvatarProps) => {
  return <Avatar radius="sm" w={44} h={44} {...props} />
}

export const BookmarkTitle = (props: TitleProps) => {
  return <Title order={3} size="md" {...props} />
}

export const BookmarkURL = (props: AnchorProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return <Anchor c="dimmed" size="xs" {...props} />
}

export const BookmarkDescription = (props: TextProps & { children: React.ReactNode }) => {
  return <Text size="sm" c="dimmed" {...props} />
}

export const BookmarkTags = (props: GroupProps) => {
  return <Group gap={4} {...props} />
}

export const BookmarkStat = (
  props: GroupProps & { icon: React.ReactNode; value: React.ReactNode }
) => {
  const { icon, value, ...rest } = props
  return (
    <Group gap={4} align="center" {...rest}>
      {icon}
      <Text size="xs">{value}</Text>
    </Group>
  )
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
      closeArchiveModal()
    },
  }

  const incrementViewCount = useMutation(api.bookmarks.view.mutationOptions(mutationOptions))
  const archiveBookmark = useMutation(api.bookmarks.archive.mutationOptions(mutationOptions))
  const togglePin = useMutation(api.bookmarks.pin.mutationOptions(mutationOptions))
  const deleteBookmark = useMutation(api.bookmarks.destroy.mutationOptions(mutationOptions))

  type Action = {
    id: string
    label: string
    icon: React.ReactNode
    onClick: () => void
  }

  const ACTIONS: Action[] = [
    {
      id: 'visit',
      label: 'Visit',
      icon: <LuExternalLink />,
      onClick: () =>
        incrementViewCount.mutate({
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
        togglePin.mutate({ params: { id: bookmark.id } })
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
  ]

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
      <Modal.Root opened={isArchiveModalOpen} onClose={closeArchiveModal} centered>
        <Modal.Overlay />
        <Modal.Content radius="md">
          <Modal.Header px={24} pb={0}>
            <Modal.Title fw="bold" fz={24}>
              {bookmark.isArchived ? 'Unarchive Bookmark' : 'Archive Bookmark'}
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body p={24} pt={0}>
            <Text>
              {bookmark.isArchived
                ? 'Move this bookmark back to your active list?'
                : 'Are you sure you want to archive this bookmark?'}
            </Text>
            <Group justify="flex-end" mt={24}>
              <Button onClick={closeArchiveModal} variant="outline">
                Cancel
              </Button>
              <Button onClick={() => archiveBookmark.mutate({ params: { id: bookmark.id } })}>
                {bookmark.isArchived ? 'Unarchive' : 'Archive'}
              </Button>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Modal.Root opened={isBookmarkModalOpen} onClose={closeBookmarkModal} centered>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header pb={8}>
            <Modal.Title fw="bold" fz="h3">
              Edit Bookmark
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <BookmarkForm
              bookmark={bookmark}
              onSuccess={() => {
                closeBookmarkModal()
                toast.success('Bookmark updated successfully!')
              }}
              onCancel={closeBookmarkModal}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Modal.Root opened={isDeleteModalOpen} onClose={closeDeleteModal} centered>
        <Modal.Overlay />
        <Modal.Content radius="md">
          <Modal.Header px={24} pb={0}>
            <Modal.Title fw="bold" fz={24}>
              Delete Bookmark
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body p={24} pt={0}>
            <Text>
              Are you sure you want to delete this bookmark? This action cannot be undone.
            </Text>
            <Group justify="flex-end" mt={24}>
              <Button onClick={closeDeleteModal} variant="outline">
                Cancel
              </Button>
              <Button
                color="red"
                onClick={() => {
                  deleteBookmark.mutate({ params: { id: bookmark.id } })
                }}
              >
                Delete Permanently
              </Button>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}
