<script setup lang="ts">
import { computed } from 'vue'
import { darkTheme, NConfigProvider } from 'naive-ui'
import { useStore } from '@/hooks'
import { naiveDateLocales, naiveLocales } from './locales/naive'
import type { WatermarkProps } from 'naive-ui'

defineOptions({
  name: 'App',
})

const { locale } = useStore('app')
const { darkMode, watermarkContent, naiveTheme, watermark } = useStore('theme')

const naiveDarkTheme = computed(() => (darkMode.value ? darkTheme : undefined))

const naiveLocale = computed(() => {
  return naiveLocales[locale.value]
})

const naiveDateLocale = computed(() => {
  return naiveDateLocales[locale.value]
})

const watermarkProps = computed<WatermarkProps>(() => {
  return {
    content: watermarkContent.value,
    cross: true,
    fullscreen: true,
    fontSize: 16,
    lineHeight: 16,
    width: 384,
    height: 384,
    xOffset: 12,
    yOffset: 60,
    rotate: -15,
    zIndex: 9999,
  }
})
</script>

<template>
  <NConfigProvider
    :theme="naiveDarkTheme"
    :theme-overrides="naiveTheme"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    class="h-full"
  >
    <AppProvider>
      <RouterView class="bg-layout" />
      <NWatermark v-if="watermark.visible" v-bind="watermarkProps" />
    </AppProvider>
  </NConfigProvider>
</template>

<style>

</style>
