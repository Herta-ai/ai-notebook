import { StringRecordId, Table } from 'surrealdb'
import type { User } from '../models/user.model'
import type { Surreal } from 'surrealdb'

const uersonTable = new Table('person')

export async function findByUsername(db: Surreal, username: string) {
  const result = await db.query<[User[]]>(
    'SELECT * FROM user WHERE username = $username LIMIT 1',
    { username },
  )
  // SurrealDB query returns array of results. result[0] is the result of first query.
  return result[0]?.[0] || null
}

export async function createUser(db: Surreal, user: Omit<User, 'id'>) {
  const created = await db.create(uersonTable, user as Record<string, any>)
  if (Array.isArray(created))
    return created[0]
  return created
}

export async function findById(db: Surreal, id: string) {
  const result = await db.select(new StringRecordId(id))
  if (Array.isArray(result))
    return result[0]
  return result
}

export async function updateUser(db: Surreal, id: string, data: Partial<User>) {
  const updated = await db.merge(new StringRecordId(id), data)
  if (Array.isArray(updated))
    return updated[0]
  return updated
}
