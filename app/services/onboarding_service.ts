import Bookmark from '#models/bookmark'
import Tag from '#models/tag'
import type User from '#models/user'
import env from '#start/env'
import logger from '@adonisjs/core/services/logger'
import db from '@adonisjs/lucid/services/db'

type PresetBookmark = Pick<Bookmark, 'title' | 'url' | 'description' | 'favicon'> & {
  tags: string[]
}

export class OnboardingService {
  private static BASE_URL = env.get('APP_URL')

  private static BOOKMARKS: PresetBookmark[] = [
    {
      title: 'GitHub',
      url: 'https://github.com',
      favicon: `${this.BASE_URL}/images/favicon-github.png`,
      description:
        'Where the world builds software. Millions of developers and companies build, ship, and maintain their software on GitHub.',
      tags: ['Tools', 'Community', 'Git'],
    },
    {
      title: 'Stack Overflow',
      url: 'https://stackoverflow.com',
      favicon: `${this.BASE_URL}/images/favicon-stack-overflow.png`,
      description:
        'The largest, most trusted online community for developers to learn, share their knowledge, and build their careers.',
      tags: ['Community', 'Reference', 'Tips'],
    },
    {
      title: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      favicon: `${this.BASE_URL}/images/favicon-mdn.png`,
      description:
        'The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.',
      tags: ['Reference', 'HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'CSS-Tricks',
      url: 'https://css-tricks.com',
      favicon: `${this.BASE_URL}/images/favicon-css-tricks.png`,
      description:
        'Daily articles about CSS, HTML, JavaScript, and all things related to web design and development.',
      tags: ['CSS', 'Tutorial', 'Tips'],
    },
    {
      title: 'Frontend Mentor',
      url: 'https://www.frontendmentor.io',
      favicon: `${this.BASE_URL}/images/favicon-frontend-mentor.png`,
      description:
        'Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.',
      tags: ['Practice', 'Learning', 'Community'],
    },
    {
      title: 'Smashing Magazine',
      url: 'https://www.smashingmagazine.com',
      favicon: `${this.BASE_URL}/images/favicon-smashing-magazine.png`,
      description:
        'For web designers and developers. Articles on CSS, JavaScript, front-end, UX, design systems, and more.',
      tags: ['Design', 'Tutorial', 'Performance'],
    },
    {
      title: 'Can I Use',
      url: 'https://caniuse.com',
      favicon: `${this.BASE_URL}/images/favicon-caniuse.png`,
      description:
        'Support tables for HTML5, CSS3, etc. Check browser compatibility for web technologies.',
      tags: ['Tools', 'Reference', 'Compatibility'],
    },
    {
      title: 'CodePen',
      url: 'https://codepen.io',
      favicon: `${this.BASE_URL}/images/favicon-codepen.png`,
      description:
        'An online code editor and social development environment for front-end designers and developers.',
      tags: ['Tools', 'Practice', 'Community'],
    },
    {
      title: 'CSS Grid Garden',
      url: 'https://cssgridgarden.com',
      favicon: `${this.BASE_URL}/images/favicon-css-grid-garden.png`,
      description:
        'A game for learning CSS grid layout. Grow your carrot garden by writing CSS grid code.',
      tags: ['CSS', 'Practice', 'Layout'],
    },
    {
      title: 'Flexbox Froggy',
      url: 'https://flexboxfroggy.com',
      favicon: `${this.BASE_URL}/images/favicon-flexbox-froggy.png`,
      description: 'A game where you help Froggy and friends by writing CSS flexbox code.',
      tags: ['CSS', 'Practice', 'Layout'],
    },
    {
      title: 'freeCodeCamp',
      url: 'https://www.freecodecamp.org',
      favicon: `${this.BASE_URL}/images/favicon-freecodecamp.png`,
      description:
        'Learn to code for free. Build projects. Earn certifications. An open source community that helps you learn to code with free online courses and certifications.',
      tags: ['Learning', 'Practice', 'Community'],
    },
    {
      title: 'JavaScript.info',
      url: 'https://javascript.info',
      favicon: `${this.BASE_URL}/images/favicon-javascript-info.png`,
      description:
        "The Modern JavaScript Tutorial. How it's done now. From the basics to advanced topics with simple, but detailed explanations.",
      tags: ['JavaScript', 'Tutorial', 'Learning'],
    },
    {
      title: 'Dev.to',
      url: 'https://dev.to',
      favicon: `${this.BASE_URL}/images/favicon-dev.png`,
      description:
        'A constructive and inclusive social network for software developers. Share knowledge and grow your career.',
      tags: ['Community', 'Learning', 'Tips'],
    },
    {
      title: 'Tailwind CSS',
      url: 'https://tailwindcss.com',
      favicon: `${this.BASE_URL}/images/favicon-tailwind.png`,
      description:
        'A utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.',
      tags: ['CSS', 'Framework', 'Tools'],
    },
    {
      title: 'Web.dev',
      url: 'https://web.dev',
      favicon: `${this.BASE_URL}/images/favicon-web-dev.png`,
      description:
        'Guidance to build modern web experiences that work on any browser. Learn about web vitals, PWAs, and more.',
      tags: ['Performance', 'Learning', 'Tips'],
    },
    {
      title: 'Claude',
      url: 'https://claude.ai',
      favicon: `${this.BASE_URL}/images/favicon-claude.png`,
      description:
        'An AI assistant created by Anthropic that can help with analysis, writing, coding, math, and creative tasks through natural conversation.',
      tags: ['Tools', 'AI', 'Learning'],
    },
    {
      title: 'React Docs',
      url: 'https://react.dev',
      favicon: `${this.BASE_URL}/images/favicon-react-docs.png`,
      description:
        'The library for web and native user interfaces. Build user interfaces out of individual pieces called components.',
      tags: ['JavaScript', 'Framework', 'Reference'],
    },
    {
      title: 'Flexbox Zombies',
      url: 'https://mastery.games/flexboxzombies',
      favicon: `${this.BASE_URL}/images/favicon-flexbox-zombies.png`,
      description:
        'Master flexbox layout in CSS by playing a survival game. Use flexbox to position your crossbow and survive the zombie apocalypse.',
      tags: ['CSS', 'Practice', 'Layout'],
    },
  ]

  static async bootstrapForUser(user: User) {
    logger.info(`Bootstrapping data for new user ${user.email} (ID: ${user.id})`)

    const uniqueTags = Array.from(new Set(this.BOOKMARKS.flatMap((b) => b.tags)))

    const bookmarksMap = new Map(this.BOOKMARKS.map((b) => [b.url, b]))

    return db.transaction(async (trx) => {
      /* -------------------- TAGS -------------------- */
      logger.info(`Ensuring ${uniqueTags.length} unique tags exist for user`)
      const tags = await Tag.fetchOrCreateMany(
        'name',
        uniqueTags.map((name) => ({
          name,
          userId: user.id,
        })),
        { client: trx }
      )
      logger.info(`Ensured ${uniqueTags.length} unique tags exist for user`)

      const tagMap = new Map(tags.map((tag) => [tag.name, tag.id]))

      logger.info(`Created ${tags.length} tags`)

      /* -------------------- BOOKMARKS -------------------- */

      // const createdBookmarks = await user.related('bookmarks').fetchOrCreateMany(
      //   this.BOOKMARKS.map(({ tags: t, ...bookmark }) => bookmark),
      //   'url',
      //   { client: trx }
      // )
      const createdBookmarks = await Bookmark.fetchOrCreateMany(
        'url',
        this.BOOKMARKS.map(({ tags: t, ...bookmark }) => ({
          ...bookmark,
          userId: user.id,
        })),
        { client: trx }
      )

      logger.info(`Created ${createdBookmarks.length} bookmarks`)

      /* -------------------- PIVOT TABLE -------------------- */

      const pivotRows: {
        bookmark_id: number
        tag_id: number
      }[] = []

      for (const bookmark of createdBookmarks) {
        const preset = bookmarksMap.get(bookmark.url)
        if (!preset) continue

        for (const tagName of preset.tags) {
          const tagId = tagMap.get(tagName)
          if (!tagId) continue

          pivotRows.push({
            bookmark_id: bookmark.id,
            tag_id: tagId,
          })
        }
      }

      if (pivotRows.length) {
        await trx.table('bookmark_tag').insert(pivotRows)
      }

      logger.info(`Inserted ${pivotRows.length} bookmark-tag relations`)

      logger.info(`Finished bootstrapping data for user`)

      return true
    })
  }
}
