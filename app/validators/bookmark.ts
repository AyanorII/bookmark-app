import vine from '@vinejs/vine'
import { type Infer } from '@vinejs/vine/types'

export const createBookmarkValidator = vine.create({
  title: vine.string().optional(),
  url: vine.string().url(),
  description: vine.string().maxLength(255).optional(),
  tags: vine.array(vine.unionOfTypes([vine.number(), vine.string()])).optional(),
})
export type CreateBookmarkValidator = Infer<typeof createBookmarkValidator>

export const updateBookmarkValidator = vine.create({
  title: vine.string().optional(),
  url: vine.string().url().optional(),
  description: vine.string().maxLength(255).optional(),
  isPinned: vine.boolean().optional(),
  isArchived: vine.boolean().optional(),
  tags: vine.array(vine.unionOfTypes([vine.number(), vine.string()])).optional(),
})
export type UpdateBookmarkValidator = Infer<typeof updateBookmarkValidator>

export const updateBookmarkTagsValidator = vine.create({
  tags: vine.array(vine.number()),
})
