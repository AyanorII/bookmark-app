import factory from '@adonisjs/lucid/factories'
import Bookmark from '#models/bookmark'
import { DateTime } from 'luxon'

export const BookmarkFactory = factory
  .define(Bookmark, async ({ faker }) => {
    const isArchived = faker.datatype.boolean()
    const viewCount = faker.number.int({ min: 0, max: 1000 })

    return {
      title: faker.lorem.sentence(),
      url: faker.internet.url(),
      description: faker.helpers.maybe(() => faker.lorem.paragraph()) ?? null,
      favicon: faker.helpers.maybe(() => faker.image.url()) ?? null,
      isPinned: faker.datatype.boolean(),
      isArchived,
      archivedAt: isArchived ? DateTime.fromJSDate(faker.date.past()) : null,
      viewCount,
      lastViewedAt: viewCount > 0 ? DateTime.fromJSDate(faker.date.recent()) : null,
    }
  })
  .build()
