import { createApp } from 'vue'
import { setupDayjs, setupLoading, setupNProgress } from './plugins'
import { setupStore } from './store'
import { setupI18n } from './locales'
import App from './App.vue'
import './styles'
import { setupRouter } from './router'

async function setupApp() {
  setupLoading()
  setupNProgress()
  setupDayjs()
  const app = createApp(App)
  setupStore(app)
  await setupRouter(app)
  setupI18n(app)
  app.mount('#app')
}

setupApp()
