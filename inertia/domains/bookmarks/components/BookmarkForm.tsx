import { Button, Group, Input, Stack, Textarea, TextInput } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { api } from '~/client'
import { MultiSelectCreatable } from '~/components/MultiSelectCreatable'
import { useForm } from '@mantine/form'
import type { CreateBookmarkValidator } from '#validators/bookmark'
import { router } from '@inertiajs/react'
import { Data } from '@generated/data'
import { useEffect } from 'react'
import { useCreateBookmarkMutation } from '../api/mutations/useCreateBookmarkMutation'
import { useUpdateBookmarkMutation } from '../api/mutations/useUpdateBookmarkMutation'

type BookmarkFormProps = {
  bookmark?: Data.Bookmark
  onSuccess?: () => void
  onCancel?: () => void
}

export const BookmarkForm = ({ bookmark, onSuccess, onCancel }: BookmarkFormProps) => {
  const { data, isLoading: isLoadingTags } = useQuery(api.tags.index.queryOptions())

  const mutationOptions = {
    onSuccess: () => {
      router.reload({ only: ['bookmarks', 'tags'] })
      onSuccess?.()
    },
  }

  const {
    mutate: updateBookmark,
    error: updateError,
    isPending: isUpdating,
  } = useUpdateBookmarkMutation(mutationOptions)

  const {
    mutate: createBookmark,
    error: createError,
    isPending: isCreating,
  } = useCreateBookmarkMutation(mutationOptions)

  useEffect(() => {
    const error = bookmark ? updateError : createError

    if (error?.response?.errors) {
      form.setErrors(error?.response?.errors)
    }
  }, [updateError, createError])

  const form = useForm<CreateBookmarkValidator>({
    initialValues: {
      title: bookmark?.title || '',
      url: bookmark?.url || '',
      description: bookmark?.description || '',
      tags: (bookmark?.tags?.map((tag) => tag.name) || []) as string[],
    },
    validateInputOnBlur: true,
  })

  const tags = data?.data || []
  const availableTags = tags.map((tag) => tag.name) ?? []

  const handleSubmit = form.onSubmit((values) => {
    if (bookmark) {
      updateBookmark({ params: { id: bookmark.id }, body: values })
    } else {
      createBookmark({ body: values })
    }
  })

  const isPending = isCreating || isUpdating

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput {...form.getInputProps('title')} label="Title" required={!!bookmark} />
        <Textarea
          {...form.getInputProps('description')}
          label="Description"
          autosize
          maxRows={8}
          minRows={3}
        />
        <TextInput {...form.getInputProps('url')} label="URL" type="url" required />
        {!isLoadingTags && (
          <Input.Wrapper label="Tags">
            <MultiSelectCreatable
              onChange={(value) => form.setFieldValue('tags', value)}
              options={availableTags}
              initialValue={form.values.tags as string[]}
            />
          </Input.Wrapper>
        )}
        <Group justify="flex-end">
          <Button onClick={onCancel} variant="outline" type="button" disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            {bookmark ? 'Save Bookmark' : 'Add Bookmark'}
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
