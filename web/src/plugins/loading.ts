// @unocss-include
import { getColorPalette, getRgb } from '@sa/color'
import { DARK_CLASS } from '@/const'
import { localStg } from '@/utils/storage'
import { toggleHtmlClass } from '@/utils/common'
import { $t } from '@/locales'

export function setupLoading() {
  const themeColor = localStg.get('themeColor') || '#646cff'
  const darkMode = localStg.get('darkMode') || false
  const palette = getColorPalette(themeColor)

  const { r, g, b } = getRgb(themeColor)

  const primaryColor = `--primary-color: ${r} ${g} ${b}`

  const svgCssVars = Array.from(palette.entries())
    .map(([key, value]) => `--logo-color-${key}: ${value}`)
    .join(';')

  const cssVars = `${primaryColor}; ${svgCssVars}`

  if (darkMode) {
    toggleHtmlClass(DARK_CLASS).add()
  }

  const loadingClasses = [
    'left-0 top-0',
    'left-0 bottom-0 animate-delay-500',
    'right-0 top-0 animate-delay-1000',
    'right-0 bottom-0 animate-delay-1500',
  ]

  const dot = loadingClasses
    .map((item) => {
      return `<div class="absolute w-16px h-16px bg-primary rounded-8px animate-pulse ${item}"></div>`
    })
    .join('\n')

  const loading = `
<div class="fixed-center flex-col bg-layout" style="${cssVars}">
  <div class="w-128px h-128px">
    ${getLogoSvg()}
  </div>
  <div class="w-56px h-56px my-36px">
    <div class="relative h-full animate-spin">
      ${dot}
    </div>
  </div>
  <h2 class="text-28px font-500 text-primary">${$t('system.title')}</h2>
</div>`

  const app = document.getElementById('app')

  if (app) {
    app.innerHTML = loading
  }
}

function getLogoSvg() {
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16"><!-- Icon from Fluent UI System Color Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE --><g fill="none"><path fill="url(#SVGVSTzxdco)" d="M12.5 4h1.625c.207 0 .375.168.375.375v1.25a.375.375 0 0 1-.375.375H12.5zm1.625 3H12.5v2h1.625a.375.375 0 0 0 .375-.375v-1.25A.375.375 0 0 0 14.125 7M12.5 10h1.625c.207 0 .375.168.375.375v1.25a.375.375 0 0 1-.375.375H12.5z"/><path fill="url(#SVG631zae2q)" d="M3.75 1A1.75 1.75 0 0 0 2 2.75v10.5c0 .966.784 1.75 1.75 1.75h7.5A1.75 1.75 0 0 0 13 13.25V2.75A1.75 1.75 0 0 0 11.25 1z"/><path fill="url(#SVGcxNNgcgD)" fill-opacity=".5" d="M3.75 1A1.75 1.75 0 0 0 2 2.75v10.5c0 .966.784 1.75 1.75 1.75h7.5A1.75 1.75 0 0 0 13 13.25V2.75A1.75 1.75 0 0 0 11.25 1z"/><path fill="url(#SVGDfsayd3E)" d="M4 3.75A.75.75 0 0 1 4.75 3h5.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-5.5A.75.75 0 0 1 4 4.25z"/><defs><linearGradient id="SVGVSTzxdco" x1="12.5" x2="18.308" y1="-.727" y2="14.426" gradientUnits="userSpaceOnUse"><stop stop-color="#d373fc"/><stop offset="1" stop-color="#2052cb"/></linearGradient><linearGradient id="SVG631zae2q" x1=".625" x2="-.123" y1="1" y2="16.671" gradientUnits="userSpaceOnUse"><stop stop-color="#e587f2"/><stop offset="1" stop-color="#816cde"/></linearGradient><linearGradient id="SVGDfsayd3E" x1="5.313" x2="10.067" y1="3" y2="7.489" gradientUnits="userSpaceOnUse"><stop stop-color="#fdd3ff"/><stop offset="1" stop-color="#f3d8ff"/></linearGradient><radialGradient id="SVGcxNNgcgD" cx="0" cy="0" r="1" gradientTransform="rotate(74.713 3.439 4.675)scale(16.0803 74.0817)" gradientUnits="userSpaceOnUse"><stop offset=".5" stop-color="#dd3ce2" stop-opacity="0"/><stop offset="1" stop-color="#dd3ce2"/></radialGradient></defs></g></svg>`

  return logoSvg
}
