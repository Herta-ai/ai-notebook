import { createApp } from 'vue'
import { setupDayjs, setupLoading, setupNProgress } from './plugins'
import { setupStore } from './store'
import { setupI18n } from './locales'
import App from './App.vue'
import './styles'

setupLoading()
setupNProgress()
setupDayjs()

const app = createApp(App)

setupStore(app)
setupI18n(app)

app.mount('#app')
