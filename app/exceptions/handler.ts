import app from '@adonisjs/core/services/app'
import { type HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import type { StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * Status pages are used to display a custom HTML pages for certain error
   * codes. You might want to enable them in production only, but feel
   * free to enable them in development as well.
   */
  protected renderStatusPages = app.inProduction

  /**
   * Status pages is a collection of error code range and a callback
   * to return the HTML contents to send as a response.
   */
  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '404': (_, { inertia }) => inertia.render('errors/not_found', {}),
    '500..599': (_, { inertia }) => inertia.render('errors/server_error', {}),
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(
    error: { status?: number; message?: string; code?: string; messages?: unknown },
    ctx: HttpContext
  ) {
    const wantsJson =
      ctx.request.url().startsWith('/api') ||
      ctx.request.accepts(['html', 'json']) === 'json' ||
      ctx.request.header('accept')?.includes('application/json')

    if (wantsJson) {
      const status = error.status ?? 500

      // Row not found
      if (status === 404) {
        return ctx.response.status(404).json({
          message: error.message ?? 'Not found',
          code: error.code ?? 'NOT_FOUND',
        })
      }

      // Validation errors
      if (status === 422) {
        const formatted: Record<string, string> = {}

        for (const err of error.messages as { field: string; message: string }[]) {
          if (!formatted[err.field]) {
            formatted[err.field] = err.message
          }
        }

        return ctx.response.status(422).send({
          message: 'Validation failed',
          errors: formatted,
        })
      }

      // Default JSON error
      return ctx.response.status(status).json({
        message: error.message ?? 'Internal server error',
        code: error.code,
      })
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
