import { createI18n } from 'vue-i18n'
import { localStg } from '@/utils/storage'
import messages from './locale'
import type { App } from 'vue'

const i18n = createI18n<[I18n.Schema]>({
  locale: localStg.get('lang') || 'zh-CN',
  fallbackLocale: 'en',
  messages,
  legacy: false,
})

/**
 * Setup plugin i18n
 *
 * @param app
 */
export function setupI18n(app: App) {
  app.use(i18n)
}

export const $t = i18n.global.t as I18n.$T

export function setLocale(locale: I18n.LangType) {
  // @ts-ignore
  // @todo: fix type
  i18n.global.locale.value = locale
}
