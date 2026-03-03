import vine from '@vinejs/vine'

export const createTagValidator = vine.create({
  name: vine.string().minLength(2).maxLength(50),
})

export const updateTagValidator = vine.create({
  name: vine.string().minLength(2).maxLength(50).optional(),
})
