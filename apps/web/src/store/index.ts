import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { resetSetupStore } from './plugins'

const storagePrefix = import.meta.env.VITE_STORAGE_PREFIX || ''

/** Setup Vue store plugin pinia */
export function setupStore(app: App) {
  const store = createPinia()

  store.use(resetSetupStore)
  store.use(createPersistedState({
    storage: window.localStorage,
    key: id => `${storagePrefix}${id}`,
  }))

  app.use(store)
}
