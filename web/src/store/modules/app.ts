import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useTitle } from '@vueuse/core'
import { SetupStoreId } from '@/const'
import { $t, setLocale } from '@/locales'
import { setDayjsLocale } from '@/locales/dayjs'
import { router } from '@/router'

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const locale = ref<App.I18n.LangType>('zh-CN')
  const localeOptions: App.I18n.LangOption[] = [
    {
      label: '中文',
      key: 'zh-CN',
    },
    {
      label: 'English',
      key: 'en-US',
    },
  ]
  function changeLocale(lang: App.I18n.LangType) {
    locale.value = lang
    setLocale(lang)
  }
  /** Update document title by locale */
  function updateDocumentTitleByLocale() {
    const { i18nKey, title } = router.currentRoute.value.meta as { i18nKey?: App.I18n.I18nKey, title?: string }

    const documentTitle = i18nKey ? $t(i18nKey) : title

    useTitle(documentTitle)
  }

  watch(locale, () => {
    updateDocumentTitleByLocale()
    setDayjsLocale(locale.value)
  })

  return {
    locale,
    localeOptions,
    changeLocale,
  }
}, {
  persist: true,
})
