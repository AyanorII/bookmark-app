import { configApp } from '@adonisjs/eslint-config'
export default configApp({
  rules: {
    '@adonisjs/no-backend-import-in-frontend': [
      'error',
      {
        allowed: [
          '#shared/*', // allows #shared/enums, #shared/constants, etc.
          '#shared/**', // allows #shared/utils/helpers (deep nested)
        ],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    'no-console': ['error', { allow: ['error', 'info'] }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_', // Ignore variables that start with _
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
})
