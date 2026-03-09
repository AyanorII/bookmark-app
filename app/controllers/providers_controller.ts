import User from '#models/user'
import { OnboardingService } from '#services/onboarding_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProvidersController {
  async github({ ally, auth, response }: HttpContext) {
    const github = ally.use('github')

    /**
     * User cancelled the authentication flow
     */
    if (github.accessDenied()) {
      return 'Access denied. You cancelled the login process.'
    }

    /**
     * OAuth state verification failed (possible CSRF attack)
     */
    if (github.stateMisMatch()) {
      return 'State mismatch. Request may have been tampered with.'
    }

    /**
     * Provider returned an error
     */
    if (github.hasError()) {
      return github.getError()
    }

    /**
     * Get the authenticated user's information
     */
    const githubUser = await github.user()

    const user = await User.firstOrCreate(
      { email: githubUser.email },
      {
        email: githubUser.email,
        fullName: githubUser.name,
        avatar: githubUser.avatarUrl,
        /**
         * Generate a random password since social users
         * won't use password-based login
         */
        password: crypto.randomUUID(),
      }
    )

    if (user.avatar !== githubUser.avatarUrl) {
      user.avatar = githubUser.avatarUrl
      await user.save()
    }

    await user.load('bookmarks')
    const hasBookmarks = user.bookmarks.length > 0

    if (!hasBookmarks) {
      await OnboardingService.bootstrapForUser(user)
    }

    await auth.use('web').login(user)

    return response.redirect('/')
  }
}
