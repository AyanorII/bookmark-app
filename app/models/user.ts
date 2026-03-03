import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { hasMany } from '@adonisjs/lucid/orm'
import Bookmark from './bookmark.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Tag from './tag.ts'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  /* -------------------------------------------------------------------------- */
  /*                                Relationships                               */
  /* -------------------------------------------------------------------------- */
  @hasMany(() => Bookmark)
  declare bookmarks: HasMany<typeof Bookmark>

  @hasMany(() => Tag)
  declare tags: HasMany<typeof Tag>
}
