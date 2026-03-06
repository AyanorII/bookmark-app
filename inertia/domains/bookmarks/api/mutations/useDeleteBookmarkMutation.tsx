import { api } from '~/client'
import { TuyauMutationOpts, useTuyauMutation } from '~/hooks/useTuyauMutation'
import { TuyauError, ValidationErrorResponse } from '~/types'

type Base = ReturnType<typeof api.bookmarks.destroy.mutationOptions>
type DeleteBookmarkError = TuyauError<ValidationErrorResponse>

export const useDeleteBookmarkMutation = (opts?: TuyauMutationOpts<Base, DeleteBookmarkError>) => {
  return useTuyauMutation(api.bookmarks.destroy.mutationOptions(), opts)
}
