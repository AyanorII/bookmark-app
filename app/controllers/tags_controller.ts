import TagTransformer from '#transformers/tag_transformer'
import { createTagValidator } from '#validators/tag'
import type { HttpContext } from '@adonisjs/core/http'

export default class TagsController {
  async index({ auth, serialize }: HttpContext) {
    const user = auth.user!
    const tags = await user.related('tags').query().withCount('bookmarks')

    return serialize(TagTransformer.transform(tags).useVariant('withBookmarksCount'))
  }

  async store({ auth, request, serialize }: HttpContext) {
    const payload = await request.validateUsing(createTagValidator)

    const user = auth.user!
    const tag = await user.related('tags').create(payload)

    return serialize(TagTransformer.transform(tag))
  }

  async update({ params, auth, request, serialize }: HttpContext) {
    const payload = await request.validateUsing(createTagValidator)

    const user = auth.user!
    const tag = await user.related('tags').query().where('id', params.id).firstOrFail()

    await tag.merge(payload).save()

    return serialize(TagTransformer.transform(tag))
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const tag = await user.related('tags').query().where('id', params.id).firstOrFail()

    await tag.delete()

    return response.noContent()
  }
}
