import type { UpdateBookmarkValidator } from '#validators/bookmark'
import { api } from '~/client'
import { TuyauMutationOpts, useTuyauMutation } from '~/hooks/useTuyauMutation'
import { TuyauError, ValidationErrorResponse } from '~/types'

type Base = ReturnType<typeof api.bookmarks.view.mutationOptions>
type Field = keyof UpdateBookmarkValidator
type IncrementBookmarkViewCountError = TuyauError<ValidationErrorResponse<Field>>

export const useIncrementBookmarkViewCountMutation = (
  opts?: TuyauMutationOpts<Base, IncrementBookmarkViewCountError>
) => {
  return useTuyauMutation(api.bookmarks.view.mutationOptions(), opts)
}
