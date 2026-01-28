import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unocss from 'unocss/vite'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import vueDevTools from 'vite-plugin-vue-devtools'
import icons from 'unplugin-icons/vite'
import iconsResolver from 'unplugin-icons/resolver'
import components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { setupHtmlPlugin } from './build/html'
import { ICONS_ASSETS } from './src/const'

dayjs.extend(utc)
dayjs.extend(timezone)

const buildTime = dayjs.tz(Date.now(), 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')

// https://vite.dev/config/
export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as Env.ImportMeta
  const isTauri = configEnv.mode === 'tauri'
  return {
    server: isTauri
      ? {
          port: 5174,
          strictPort: true,
        }
      : undefined,
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@/styles/scss/global.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      unocss(),
      icons({
        customCollections: {
          local: FileSystemIconLoader(ICONS_ASSETS, svg =>
            svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')),
        },
      }),
      components({
        dts: './src/types/components.d.ts',
        resolvers: [
          NaiveUiResolver(),
          iconsResolver({
            prefix: 'i',
            customCollections: ['local'],
          }),
        ],
      }),
      vueDevTools({
        launchEditor: viteEnv.VITE_DEVTOOLS_LAUNCH_EDITOR,
      }),
      setupHtmlPlugin(buildTime),
    ],
    define: {
      BUILD_TIME: JSON.stringify(buildTime),
    },
  }
})
