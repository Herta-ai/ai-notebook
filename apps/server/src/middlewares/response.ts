import { Elysia } from 'elysia'
import { error } from '../utils/response'

export const responsePlugin = new Elysia({ name: 'response-plugin' })
  .onError(({ code, error: err, set }) => {
    let statusCode = 500

    // Map common errors
    if (code === 'NOT_FOUND')
      statusCode = 404
    if (code === 'VALIDATION')
      statusCode = 400
    if (code === 'PARSE')
      statusCode = 400
    if (code === 'INTERNAL_SERVER_ERROR')
      statusCode = 500

    set.status = statusCode

    return error((err as Error).message || 'Internal Server Error', statusCode)
  })
