import { t } from 'elysia'
import type { RecordId } from 'surrealdb'

export interface LLMProvider {
  id: RecordId
  userId: RecordId
  name: string
  type: string
  baseURL: string
  apiKey: string
  proxy?: string
  models?: LLMModel[]
  createdAt?: string
  updatedAt?: string
}

export interface LLMModel {
  id: RecordId
  providerId: RecordId
  modelId: string
  ability: string[]
  temperature: number
  topP: number
  stream: boolean
  custom?: string
  createdAt?: string
  updatedAt?: string
}

export const CreateProviderDTO = t.Object({
  name: t.String(),
  type: t.String(),
  baseURL: t.String(),
  apiKey: t.String(),
  proxy: t.Optional(t.String()),
})

export const UpdateProviderDTO = t.Partial(CreateProviderDTO)

export const CreateModelDTO = t.Object({
  providerId: t.String({ error: 'providerId 不能为空', minLength: 1 }),
  modelId: t.String({ error: 'modelId 不能为空', minLength: 1 }),
  ability: t.Array(t.String(), { minItems: 1, error: 'ability 最少包含一个元素' }),
  temperature: t.Optional(t.Number({ default: 0.85 })),
  topP: t.Optional(t.Number({ default: 0.95 })),
  stream: t.Optional(t.Boolean({ default: true })),
  custom: t.Optional(t.String()),
})

export const UpdateModelDTO = t.Partial(t.Omit(CreateModelDTO, ['providerId']))
