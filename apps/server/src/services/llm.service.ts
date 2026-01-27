import { StringRecordId } from 'surrealdb'
import type Surreal from 'surrealdb'
import type { LLMModel, LLMProvider } from '../models/llm.model'

// Provider Services

export async function createProvider(db: Surreal, userId: string, data: Partial<LLMProvider>) {
  const providerData = {
    ...data,
    userId: new StringRecordId(userId),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const created = await db.create('llm_provider', providerData as Record<string, any>)
  if (Array.isArray(created))
    return created[0]
  return created
}

export async function getProvidersByUser(db: Surreal, userId: string) {
  const result = await db.query<[LLMProvider[]]>(
    'SELECT *, (SELECT * FROM llm_model WHERE providerId = $parent.id) AS models FROM llm_provider WHERE userId = $userId ORDER BY createdAt DESC',
    { userId: new StringRecordId(userId) },
  )
  return result[0] || []
}

export async function getProviderById(db: Surreal, id: string) {
  try {
    const result = await db.select(new StringRecordId(id))
    if (Array.isArray(result))
      return result[0]
    return result
  }
  catch {
    return null
  }
}

export async function updateProvider(db: Surreal, id: string, userId: string, data: Partial<LLMProvider>) {
  // Verify ownership
  const provider = await getProviderById(db, id) as LLMProvider
  if (!provider || provider.userId.toString() !== userId) {
    return null
  }

  const updateData = {
    ...data,
    updatedAt: new Date().toISOString(),
  }

  try {
    const updated = await db.merge(new StringRecordId(id), updateData)
    if (Array.isArray(updated))
      return updated[0]
    return updated
  }
  catch (error) {
    console.error('Update provider failed:', error)
    return null
  }
}

export async function deleteProvider(db: Surreal, id: string, userId: string) {
  // Verify ownership
  const provider = await getProviderById(db, id) as LLMProvider
  if (!provider || provider.userId.toString() !== userId) {
    return false
  }

  try {
    // Cascade delete models
    // Note: Assuming we can delete by where clause or we need to fetch IDs first.
    // SurrealDB delete supports WHERE.
    await db.query('DELETE llm_model WHERE providerId = $providerId', { providerId: new StringRecordId(id) })
    await db.delete(new StringRecordId(id))
    return true
  }
  catch (error) {
    console.error('Delete provider failed:', error)
    return false
  }
}

// Model Services

export async function createModel(db: Surreal, userId: string, data: Omit<Partial<LLMModel>, 'providerId'> & { providerId: string }) {
  // Verify provider exists and belongs to user
  if (!data.providerId)
    return null

  const provider = await getProviderById(db, data.providerId as string) as LLMProvider
  if (!provider || provider.userId.toString() !== userId) {
    throw new Error('Invalid provider')
  }

  const modelData = {
    ...data,
    providerId: new StringRecordId(data.providerId as string),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const created = await db.create('llm_model', modelData as Record<string, any>)
  if (Array.isArray(created))
    return created[0]
  return created
}

export async function getModelsByProvider(db: Surreal, providerId: string) {
  const result = await db.query<[LLMModel[]]>(
    'SELECT * FROM llm_model WHERE providerId = $providerId ORDER BY createdAt DESC',
    { providerId: new StringRecordId(providerId) },
  )
  return result[0] || []
}

export async function getModelById(db: Surreal, id: string) {
  try {
    const result = await db.select(new StringRecordId(id))
    if (Array.isArray(result))
      return result[0]
    return result
  }
  catch {
    return null
  }
}

export async function updateModel(db: Surreal, id: string, userId: string, data: Partial<LLMModel>) {
  // Verify ownership via provider
  const model = await getModelById(db, id) as LLMModel
  if (!model)
    return null

  const provider = await getProviderById(db, model.providerId.toString()) as LLMProvider
  if (!provider || provider.userId.toString() !== userId) {
    return null
  }

  const updateData = {
    ...data,
    updatedAt: new Date().toISOString(),
  }

  try {
    const updated = await db.merge(new StringRecordId(id), updateData)
    if (Array.isArray(updated))
      return updated[0]
    return updated
  }
  catch (error) {
    console.error('Update model failed:', error)
    return null
  }
}

export async function deleteModel(db: Surreal, id: string, userId: string) {
  const model = await getModelById(db, id) as LLMModel
  if (!model)
    return false

  const provider = await getProviderById(db, model.providerId.toString()) as LLMProvider
  if (!provider || provider.userId.toString() !== userId) {
    return false
  }

  try {
    await db.delete(new StringRecordId(id))
    return true
  }
  catch (error) {
    console.error('Delete model failed:', error)
    return false
  }
}
