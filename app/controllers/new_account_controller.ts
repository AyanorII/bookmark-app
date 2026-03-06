import User from '#models/user'
import { OnboardingService } from '#services/onboarding_service'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class NewAccountController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/signup', {})
  }

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)
    const user = await User.create({ ...payload })

    try {
      await OnboardingService.bootstrapForUser(user)
    } catch (err) {
      logger.error(err)
    }

    await auth.use('web').login(user)
    response.redirect().toRoute('home')
  }
}
