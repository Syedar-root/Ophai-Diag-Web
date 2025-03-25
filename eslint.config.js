import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
export default {
  ignores: ['node_modules', 'eslint-config.js', '*/auto-imports.d.ts', '*/components.d.ts'],
  files: ['src/**/*.ts', 'src/**/*.vue'],
  rules: {
    // 'no-console': 'error',
    // 'no-unused-vars': 'error'
  },
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: tsParser,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    }
  }
}
