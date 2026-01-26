import { error } from '../utils/response'
import type { ErrorHandler } from 'elysia'

export const errorHandler: ErrorHandler = ({ code, error: err, set }) => {
  let statusCode = 500
  let message = (err as Error).message || 'Internal Server Error'

  // Map common errors
  if (code === 'NOT_FOUND') {
    statusCode = 404
    message = 'Not Found'
  }
  if (code === 'VALIDATION') {
    statusCode = 400
    try {
      const json = JSON.parse(message)
      if (json.summary)
        message = json.summary
    }
    catch {
      // ignore
    }
  }
  if (code === 'PARSE')
    statusCode = 400
  if (code === 'INTERNAL_SERVER_ERROR')
    statusCode = 500

  set.status = statusCode

  return error(message, statusCode)
}
