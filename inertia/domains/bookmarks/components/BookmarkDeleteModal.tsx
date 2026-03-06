import { Button, Group, Modal, Text } from '@mantine/core'
import { useDeleteBookmarkMutation } from '../api/mutations/useDeleteBookmarkMutation'
import { toast } from 'sonner'
import { router } from '@inertiajs/react'
import { Data } from '@generated/data'

type BookmarkDeleteModalProps = {
  bookmark: Data.Bookmark
  isOpen: boolean
  onClose: () => void
}
export const BookmarkDeleteModal = ({ bookmark, isOpen, onClose }: BookmarkDeleteModalProps) => {
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation()

  const handleDelete = () => {
    deleteBookmark(
      { params: { id: bookmark.id } },
      {
        onSuccess: () => {
          router.reload({ only: ['bookmarks', 'tags'] })
          toast.success('Bookmark deleted successfully')
          onClose()
        },
        onError: (error) => {
          toast.error(error.response?.errors?.at(0)?.message || 'Failed to delete bookmark')
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
            Delete Bookmark
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body p={24} pt={0}>
          <Text>Are you sure you want to delete this bookmark? This action cannot be undone.</Text>
          <Group justify="flex-end" mt={24}>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="red">
              Delete Permanently
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
