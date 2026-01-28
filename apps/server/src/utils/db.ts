import { Elysia } from 'elysia'
import { createNodeEngines } from '@surrealdb/node'
import { Surreal } from 'surrealdb'

export const db = new Surreal({
  engines: process.env.SURREAL_NODE_ENGINE === 'true' ? createNodeEngines() : undefined,
})

export async function initDB() {
  try {
    await db.connect(process.env.SURREAL_URL)
    await db.use({
      namespace: process.env.SURREAL_NS,
      database: process.env.SURREAL_DB,
    })
    if (process.env.SURREAL_NODE_ENGINE !== 'true') {
      await db.signin({
        username: process.env.SURREAL_USER,
        password: process.env.SURREAL_PASS,
      })
    }

    console.log('✅ SurrealDB Connected')
  }
  catch (e) {
    console.error('❌ SurrealDB Connection failed:', e)
  }
}

export const surreal = new Elysia({ name: 'surrealdb' })
  .decorate('db', db)
