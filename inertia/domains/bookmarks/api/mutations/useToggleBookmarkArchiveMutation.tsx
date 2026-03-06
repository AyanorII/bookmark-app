import type { UpdateBookmarkValidator } from '#validators/bookmark'
import { api } from '~/client'
import { TuyauMutationOpts, useTuyauMutation } from '~/hooks/useTuyauMutation'
import { TuyauError, ValidationErrorResponse } from '~/types'

type Base = ReturnType<typeof api.bookmarks.archive.mutationOptions>
type Field = keyof UpdateBookmarkValidator
type ToggleBookmarkArchiveError = TuyauError<ValidationErrorResponse<Field>>

export const useToggleBookmarkArchiveMutation = (
  opts?: TuyauMutationOpts<Base, ToggleBookmarkArchiveError>
) => {
  return useTuyauMutation(api.bookmarks.archive.mutationOptions(), opts)
}
