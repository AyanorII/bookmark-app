import type User from '#models/user'
import type Bookmark from '#models/bookmark'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class BookmarkPolicy extends BasePolicy {
  create(user: User): AuthorizerResponse {
    return !!user
  }

  edit(user: User, bookmark: Bookmark): AuthorizerResponse {
    return user.id === bookmark.userId
  }

  delete(user: User, bookmark: Bookmark): AuthorizerResponse {
    return user.id === bookmark.userId
  }
}
