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
    // 禁用 perfectionist/sort-imports 规则
    'perfectionist/sort-imports': 'off',
    // 配置 import-x/order 规则
    'import-x/order': [
      'error',
      {
        // 配置vue必须要在导入element-plus之前，否则会报错
        pathGroupsExcludedImportTypes: ['vue'],
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        groups: [
          ['type'],
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
  },
})
