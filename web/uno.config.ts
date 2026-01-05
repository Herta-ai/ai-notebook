import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { themeVars } from './src/theme/vars'
import { ICONS_ASSETS } from './src/const/icons'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex flex-col justify-center items-center',
    'flex-x': 'flex',
    'flex-auto-0': 'flex-grow-0 flex-shrink-0 flex-basis-auto',
    'flex-y': 'flex flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex flex-col items-center',
    'wh-full': 'w-full h-full',
    'absolute-lt': 'absolute left-0 top-0',
    'absolute-rt': 'absolute right-0 top-0 ',
    'absolute-full': 'absolute right-0 top-0 left-0 bottom-0',
    'fixed-lt': 'fixed left-0 top-0',
    'fixed-rt': 'fixed right-0 top-0 ',
    'fixed-full': 'fixed right-0 top-0 left-0 bottom-0',
    'fixed-center': 'fixed left-0 top-0 wh-full flex-center',
    'nprogress-primary': 'important-bg-primary',
  },
  theme: {
    ...themeVars,
    fontSize: {
      'icon-xs': '0.875rem',
      'icon-small': '1rem',
      'icon': '1.125rem',
      'icon-large': '1.5rem',
      'icon-xl': '2rem',
    },
  },
  extendTheme: (theme) => {
    return {
      ...theme,
      fontSize: {
        'extra-small': 'var(--el-font-size-extra-small)',
        'small': 'var(--el-font-size-small)',
        'base': 'var(--el-font-size-base)',
        'medium': 'var(--el-font-size-medium)',
        'large': 'var(--el-font-size-large)',
        'extra-large': 'var(--el-font-size-extra-large)',
        'title-base': '24px',
        'title-large': '30px',
      },
    }
  },
  presets: [
    presetWind3(),
    presetIcons({
      autoInstall: true,
      scale: 1,
      extraProperties: {
        display: 'inline-block',
      },
      collections: {
        local: FileSystemIconLoader(ICONS_ASSETS, svg =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')),
      },
      warn: true,
      unit: 'em',
    }),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: ['nprogress-primary'],
  variants: [
    {
      match: (s) => {
        if (s.startsWith('i-ep')) {
          return {
            matcher: s,
            selector: (s) => {
              return s.startsWith('.') ? `${s.slice(1)},${s}` : s
            },
          }
        }
      },
    },
  ],
})
