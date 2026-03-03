/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home', {}).as('home')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    // Public API routes
    router.resource('sessions', controllers.ApiSessions).only(['store']).as('api.sessions')

    // Protected API routes
    router
      .group(() => {
        router.resource('bookmarks', controllers.Bookmarks).apiOnly()
        router
          .patch('bookmarks/:id/pin', [controllers.Bookmarks, 'togglePin'])
          .as('bookmarks.togglePin')
        router
          .patch('bookmarks/:id/archive', [controllers.Bookmarks, 'toggleArchive'])
          .as('bookmarks.toggleArchive')
        router
          .patch('bookmarks/:id/view', [controllers.Bookmarks, 'incrementViewCount'])
          .as('bookmarks.incrementViewCount')
        router
          .put('bookmarks/:id/tags', [controllers.Bookmarks, 'updateTags'])
          .as('bookmarks.updateTags')

        router
          .resource('tags', controllers.Tags)
          .only(['index', 'store', 'update', 'destroy'])
          .as('api.tags')

        router.resource('sessions', controllers.ApiSessions).only(['destroy']).as('api.sessions')
      })
      .use(middleware.auth())
  })
  .prefix('api')

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())
