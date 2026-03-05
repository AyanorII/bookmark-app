import type { CreateBookmarkValidator } from '#validators/bookmark'
import { api } from '~/client'
import { TuyauMutationOpts, useTuyauMutation } from '~/hooks/useTuyauMutation'
import type { TuyauError, ValidationErrorResponse } from '~/types'

export type CreateBookmarkField = keyof CreateBookmarkValidator
type CreateBookmarkError = TuyauError<ValidationErrorResponse<CreateBookmarkField>>
type Base = ReturnType<typeof api.bookmarks.store.mutationOptions>

export function useCreateBookmarkMutation(opts?: TuyauMutationOpts<Base, CreateBookmarkError>) {
  return useTuyauMutation(api.bookmarks.store.mutationOptions(), opts)
}
