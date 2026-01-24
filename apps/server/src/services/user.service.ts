import type { User } from '../models/user.model'
import type Surreal from 'surrealdb'

export async function findByUsername(db: Surreal, username: string) {
  const result = await db.query<[User[]]>(
    'SELECT * FROM user WHERE username = $username LIMIT 1',
    { username },
  )
  // SurrealDB query returns array of results. result[0] is the result of first query.
  return result[0]?.[0] || null
}

export async function createUser(db: Surreal, user: User) {
  const created = await db.create('user', user as Record<string, any>)
  if (Array.isArray(created))
    return created[0]
  return created
}

export async function findById(db: Surreal, id: string) {
  try {
    const result = await db.select(id)
    if (Array.isArray(result))
      return result[0]
    return result
  }
  catch {
    return null
  }
}

export async function updateUser(db: Surreal, id: string, data: Partial<User>) {
  try {
    const updated = await db.merge(id, data)
    if (Array.isArray(updated))
      return updated[0]
    return updated
  }
  catch (error) {
    // @todo: 暂时使用log，后续改进封装logger
    console.error(error)
    return null
  }
}
