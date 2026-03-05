import { Button, Group, Stack, Textarea, TextInput } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { api } from '~/client'
import { MultiSelectCreatable } from '~/components/MultiSelectCreatable'
import { useForm } from '@mantine/form'
import type { CreateBookmarkValidator } from '#validators/bookmark'
import { router } from '@inertiajs/react'
import { Data } from '@generated/data'
import { useEffect } from 'react'
import {
  CreateBookmarkField,
  useCreateBookmarkMutation,
} from '../api/mutations/useCreateBookmarkMutation'

type BookmarkFormProps = {
  bookmark?: Data.Bookmark
  onSuccess?: () => void
  onCancel?: () => void
}

export const BookmarkForm = ({ bookmark, onSuccess, onCancel }: BookmarkFormProps) => {
  const { data, isLoading: isLoadingTags } = useQuery(api.tags.index.queryOptions())

  const {
    mutate: createBookmark,
    error,
    isPending,
  } = useCreateBookmarkMutation({
    onSuccess: () => {
      router.reload({ only: ['bookmarks', 'tags'] })
      onSuccess?.()
    },
  })

  useEffect(() => {
    if (error?.response?.errors.length) {
      const errors = error.response.errors.reduce(
        (acc, curr) => {
          acc[curr.field] = curr.message
          return acc
        },
        {} as Record<CreateBookmarkField, string>
      )

      form.setErrors(errors)
    }
  }, [error])

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
    console.log('Submitting form with values:', values)
    createBookmark({ body: values })
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput {...form.getInputProps('title')} label="Title" required />
        <Textarea {...form.getInputProps('description')} label="Description" />
        <TextInput {...form.getInputProps('url')} label="URL" type="url" required />
        {!isLoadingTags && (
          <MultiSelectCreatable
            onChange={(value) => form.setFieldValue('tags', value)}
            options={availableTags}
            initialValue={form.values.tags as string[]}
          />
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
