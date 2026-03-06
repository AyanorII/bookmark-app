import type { UpdateBookmarkValidator } from '#validators/bookmark'
import { api } from '~/client'
import { TuyauMutationOpts, useTuyauMutation } from '~/hooks/useTuyauMutation'
import type { TuyauError, ValidationErrorResponse } from '~/types'

export type UpdateBookmarkField = keyof UpdateBookmarkValidator
type UpdateBookmarkError = TuyauError<ValidationErrorResponse<UpdateBookmarkField>>
type Base = ReturnType<typeof api.bookmarks.update.mutationOptions>

export function useUpdateBookmarkMutation(opts?: TuyauMutationOpts<Base, UpdateBookmarkError>) {
  return useTuyauMutation(api.bookmarks.update.mutationOptions(), opts)
}
