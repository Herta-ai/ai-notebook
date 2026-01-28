import { RecordId, StringRecordId, Table } from 'surrealdb'
import type { User } from '../models/user.model'
import type { Surreal } from 'surrealdb'

const userTable = new Table('user')

export async function findByUsername(db: Surreal, username: string) {
  const result = await db.query<[User[]]>(
    'SELECT * FROM user WHERE username = $username LIMIT 1',
    { username },
  )
  // SurrealDB query returns array of results. result[0] is the result of first query.
  return result[0]?.[0] || null
}

export async function createUser(db: Surreal, user: Omit<User, 'id'>) {
  const created = await db.create<User>(userTable).content({
    ...user,
  })
  if (Array.isArray(created))
    return created[0]
  return created
}

export async function findById(db: Surreal, id: string) {
  const result = await db.select(new RecordId(userTable, id))
  if (Array.isArray(result))
    return result[0]
  return result
}

export async function updateUser(db: Surreal, id: string, data: Partial<User>) {
  const updated = await db.update(new RecordId(userTable, id)).merge(data)
  console.log('update', updated)
  if (Array.isArray(updated))
    return updated[0]
  return updated
}
