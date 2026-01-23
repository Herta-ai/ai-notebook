import antfu from '@antfu/eslint-config'
import { importX } from 'eslint-plugin-import-x'

export default antfu({
  type: 'app',
  typescript: true,
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  plugins: {
    'import-x': importX,
  },
  rules: {
    'ts/ban-ts-comment': 'off',
    'no-console': 'off',
    // 禁用 perfectionist/sort-imports 规则
    'perfectionist/sort-imports': 'off',
    // 配置 import-x/order 规则
    'import-x/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      },
    ],
  },
})
