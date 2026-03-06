import Bookmark from '#models/bookmark'
import User from '#models/user'
import logger from '@adonisjs/core/services/logger'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await this.seedUsers()
    await this.seedBookmarks()
  }

  async seedUsers() {
    logger.info('⏳ Deleting existing users...')
    await User.query().delete()
    logger.info('✅ Successfully deleted existing users.')

    logger.info(' ')

    const USERS_COUNT = 10

    logger.info(`⏳ Seeding ${USERS_COUNT} users...`)
    User.createMany(
      Array.from({ length: USERS_COUNT }, (_, i) => ({
        email: `test+${i + 1}@test.com`,
        password: 'password',

        fullName: `User ${i + 1}`,
      }))
    )
    logger.info(`✅ Successfully seeded ${USERS_COUNT} users.`)
  }

  async seedBookmarks() {
    logger.info('⏳ Deleting existing bookmarks...')
    await Bookmark.query().delete()
    logger.info('✅ Successfully deleted existing bookmarks.')

    logger.info(' ')

    logger.info('⏳ Seeding bookmarks for each user...')
    const users = await User.all()

    await Promise.all(
      users.map(async (user) => {
        await user.related('bookmarks').createMany([
          {
            title: 'AdonisJS Documentation',
            url: 'https://docs.adonisjs.com/',
            description: 'Official documentation for AdonisJS framework.',
            favicon: 'https://docs.adonisjs.com/favicon.ico',
          },
          {
            title: 'GitHub',
            url: 'https://github.com/',
            description: 'GitHub is a platform for version control and collaboration.',
            favicon: 'https://github.githubassets.com/favicons/favicon.png',
          },
          {
            title: 'Stack Overflow',
            url: 'https://stackoverflow.com/',
            description: 'A community of developers helping each other solve coding problems.',
            favicon: 'https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico',
          },
          {
            title: 'MDN Web Docs',
            url: 'https://developer.mozilla.org/',
            description:
              'Comprehensive resource for web developers, covering HTML, CSS, JavaScript, and more.',
            favicon: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
          },
          {
            title: 'Reddit Programming',
            url: 'https://www.reddit.com/r/programming/',
            description: 'A subreddit for discussion and news about programming.',
            favicon: 'https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png',
          },
          {
            title: 'Hacker News',
            url: 'https://news.ycombinator.com/',
            description: 'A social news website focusing on computer science and entrepreneurship.',
            favicon: 'https://news.ycombinator.com/favicon.ico',
          },
        ])
      })
    )
    logger.info('✅ Successfully seeded bookmarks for each user.')
  }
}
