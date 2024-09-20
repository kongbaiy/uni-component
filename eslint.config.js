// 如果没有在 page.json 配置 "type": "module"
const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  overrides: {
    vue: {
      'vue/component-name-in-template-casing': ['off'],
    },
  },
  // unocss: true,
  vue: true,
  typescript: true,
  rules: {
    'no-unused-vars': 'off',
    'camelcase': [2, { properties: 'always' }],
    'no-console': 'off',
    'curly': 'off',
    'antfu/if-newline': 'off',
    'brace-style': 'off',
    'style/brace-style': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: false,
    }],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
  },
})
