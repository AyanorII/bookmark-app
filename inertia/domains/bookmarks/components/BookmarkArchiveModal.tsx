import { Data } from '@generated/data'
import { Button, Group, Modal, Text } from '@mantine/core'
import { useToggleBookmarkArchiveMutation } from '../api/mutations/useToggleBookmarkArchiveMutation'
import { toast } from 'sonner'
import { router } from '@inertiajs/react'

type BookmarkArchiveModalProps = {
  bookmark: Data.Bookmark
  isOpen: boolean
  onClose: () => void
}
export const BookmarkArchiveModal = ({ bookmark, isOpen, onClose }: BookmarkArchiveModalProps) => {
  const { mutate: archiveBookmark } = useToggleBookmarkArchiveMutation()

  const handleArchiveToggle = () => {
    archiveBookmark(
      {
        params: { id: bookmark.id },
      },
      {
        onSuccess: () => {
          router.reload({ only: ['bookmarks', 'tags'] })
          toast.success(
            bookmark.isArchived
              ? 'Bookmark restored successfully'
              : 'Bookmark archived successfully'
          )
          onClose()
        },
        onError: (error) => {
          toast.error(error.response?.errors?.at(0)?.message || 'Failed to update bookmark')
        },
      }
    )
  }

  return (
    <Modal.Root opened={isOpen} onClose={onClose} centered>
      <Modal.Overlay />
      <Modal.Content radius="md">
        <Modal.Header px={24} pb={0}>
          <Modal.Title fw="bold" fz={24}>
            {bookmark.isArchived ? 'Restore Bookmark' : 'Archive Bookmark'}
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
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleArchiveToggle}>
              {bookmark.isArchived ? 'Restore' : 'Archive'}
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
