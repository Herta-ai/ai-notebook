import { Elysia } from 'elysia'
import Surreal from 'surrealdb'

export const db = new Surreal()

export async function initDB() {
  try {
    await db.connect(process.env.SURREAL_URL || 'ws://127.0.0.1:8000/rpc', {
      namespace: process.env.SURREAL_NS || 'test',
      database: process.env.SURREAL_DB || 'test',
      auth: {
        username: process.env.SURREAL_USER || 'root',
        password: process.env.SURREAL_PASS || 'root',
      },
    })
    await db.ready
    console.log('✅ SurrealDB Connected')
  }
  catch (e) {
    console.error('❌ SurrealDB Connection failed:', e)
  }
}

export const surreal = new Elysia({ name: 'surrealdb' })
  .decorate('db', db)
