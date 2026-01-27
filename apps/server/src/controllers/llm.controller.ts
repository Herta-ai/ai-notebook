import { Elysia, t } from 'elysia'
import { authPlugin } from '../middlewares/auth'
import { surreal } from '../utils/db'
import * as llmService from '../services/llm.service'
import { CreateModelDTO, CreateProviderDTO, UpdateModelDTO, UpdateProviderDTO } from '../models/llm.model'
import { error, success } from '../utils/response'

export const llmController = new Elysia({ prefix: '/llm' })
  .use(surreal)
  .use(authPlugin)

// Providers Endpoints

  .post('/providers', async ({ db, user, body }) => {
    if (!user)
      return error('Unauthorized', 401)

    const provider = await llmService.createProvider(db, user.id, body)
    if (!provider)
      return error('Failed to create provider', 500)

    return success(provider, 'Provider created successfully')
  }, {
    body: CreateProviderDTO,
    isAuth: true,
  })

  .get('/providers', async ({ db, user }) => {
    if (!user)
      return error('Unauthorized', 401)

    const providers = await llmService.getProvidersByUser(db, user.id)
    return success(providers)
  }, {
    isAuth: true,
  })

  .put('/providers/:id', async ({ db, user, params: { id }, body }) => {
    if (!user)
      return error('Unauthorized', 401)

    const updated = await llmService.updateProvider(db, id, user.id, body)
    if (!updated)
      return error('Failed to update provider or not found', 404)

    return success(updated, 'Provider updated successfully')
  }, {
    body: UpdateProviderDTO,
    isAuth: true,
  })

  .delete('/providers/:id', async ({ db, user, params: { id } }) => {
    if (!user)
      return error('Unauthorized', 401)

    const deleted = await llmService.deleteProvider(db, id, user.id)
    if (!deleted)
      return error('Failed to delete provider or not found', 404)

    return success(null, 'Provider deleted successfully')
  }, {
    isAuth: true,
  })

// Models Endpoints

  .post('/models', async ({ db, user, body }) => {
    if (!user)
      return error('Unauthorized', 401)

    try {
      const model = await llmService.createModel(db, user.id, body)
      if (!model)
        return error('Failed to create model', 500)
      return success(model, 'Model created successfully')
    }
    catch {
      return error('Invalid provider or permission denied', 400)
    }
  }, {
    body: CreateModelDTO,
    isAuth: true,
  })

  .get('/models', async ({ db, user, query }) => {
    if (!user)
      return error('Unauthorized', 401)

    const { providerId } = query
    if (!providerId)
      return error('Provider ID is required', 400)

    // Verify provider ownership first?
    // getModelsByProvider in service just queries by providerId.
    // We should ensure the provider belongs to the user.
    const provider = await llmService.getProviderById(db, providerId)
    if (!provider || provider.userId.toString() !== user.id) {
      return error('Provider not found or access denied', 404)
    }

    const models = await llmService.getModelsByProvider(db, providerId)
    return success(models)
  }, {
    query: t.Object({
      providerId: t.String(),
    }),
    isAuth: true,
  })

  .put('/models/:id', async ({ db, user, params: { id }, body }) => {
    if (!user)
      return error('Unauthorized', 401)

    const updated = await llmService.updateModel(db, id, user.id, body)
    if (!updated)
      return error('Failed to update model or not found', 404)

    return success(updated, 'Model updated successfully')
  }, {
    body: UpdateModelDTO,
    isAuth: true,
  })

  .delete('/models/:id', async ({ db, user, params: { id } }) => {
    if (!user)
      return error('Unauthorized', 401)

    const deleted = await llmService.deleteModel(db, id, user.id)
    if (!deleted)
      return error('Failed to delete model or not found', 404)

    return success(null, 'Model deleted successfully')
  }, {
    isAuth: true,
  })
