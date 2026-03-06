import { Modal } from '@mantine/core'
import { BookmarkForm } from './BookmarkForm'
import { Data } from '@generated/data'
import { toast } from 'sonner'
import { router } from '@inertiajs/react'

type BookmarkEditModalProps = {
  bookmark: Data.Bookmark
  isOpen: boolean
  onClose: () => void
}
export const BookmarkEditModal = ({ bookmark, isOpen, onClose }: BookmarkEditModalProps) => {
  const handleSaveSuccess = () => {
    router.reload({ only: ['bookmarks', 'tags'] })
    toast.success('Bookmark updated successfully')
    onClose()
  }

  return (
    <Modal.Root opened={isOpen} onClose={onClose} centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header pb={8}>
          <Modal.Title fw="bold" fz="h3">
            Edit Bookmark
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <BookmarkForm bookmark={bookmark} onSuccess={handleSaveSuccess} onCancel={onClose} />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
