import vine from '@vinejs/vine'

export const createBookmarkValidator = vine.create({
  title: vine.string(),
  url: vine.string().url(),
  favicon: vine.string().url().optional(),
  description: vine.string().maxLength(255).optional(),
})

export const updateBookmarkValidator = vine.create({
  title: vine.string().optional(),
  url: vine.string().url().optional(),
  favicon: vine.string().url().optional(),
  description: vine.string().maxLength(255).optional(),
  isPinned: vine.boolean().optional(),
  isArchived: vine.boolean().optional(),
})
