import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ApiSessionController {
  async store({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.ok({
      message: 'Logged in successfully',
      user: {
        id: user.id,
        email: user.email,
      },
    })
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.ok({
      message: 'Logged out successfully',
    })
  }
}
