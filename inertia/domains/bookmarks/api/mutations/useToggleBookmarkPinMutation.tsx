import type { UpdateBookmarkValidator } from '#validators/bookmark'
import { api } from '~/client'
import { TuyauMutationOpts, useTuyauMutation } from '~/hooks/useTuyauMutation'
import { TuyauError, ValidationErrorResponse } from '~/types'

type Base = ReturnType<typeof api.bookmarks.pin.mutationOptions>
type Field = keyof UpdateBookmarkValidator
type ToggleBookmarkPinError = TuyauError<ValidationErrorResponse<Field>>

export const useToggleBookmarkPinMutation = (
  opts?: TuyauMutationOpts<Base, ToggleBookmarkPinError>
) => {
  return useTuyauMutation(api.bookmarks.pin.mutationOptions(), opts)
}
