import './styles'
import { createApp } from 'vue'
import { setupAppVersionNotification, setupDayjs, setupLoading, setupNProgress } from '@/plugins'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupI18n } from '@/locales'
import App from './App.vue'

async function setupApp() {
  setupLoading()
  setupNProgress()
  const app = createApp(App)
  setupStore(app)
  setupDayjs()
  await setupRouter(app)
  setupI18n(app)
  setupAppVersionNotification()
  app.mount('#app')
}

setupApp()
