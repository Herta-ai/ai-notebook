import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { errorHandler } from './middlewares/response'
import { userController } from './controllers/user.controller'
import { llmController } from './controllers/llm.controller'
import { initDB, surreal } from './utils/db'

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .onError(errorHandler)
  .use(surreal)
  .onStart(initDB)
  .use(userController)
  .use(llmController)
  .get('/', () => 'Hello Elysia + SurrealDB')
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
