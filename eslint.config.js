import eslint from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: [
      'node_modules',
      'scripts/*',
      'config/*',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
      '.DS_Store',
      'package.json',
      'tsconfig.json',
      '**/*.md',
      'build',
      '.eslintrc.cjs',
      'eslint.config.js',
      '**/.*',
    ],
  },
  eslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        Edit: 'writable',
        console: 'writable',
        _: 'writable',
        $: 'writable',
        JSX: true,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: '.',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      'import': importPlugin,
      'prettier': prettierPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'error',
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
    },
    settings: {
      'react': {
        version: 'detect',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['**/*.ts', '**/*.tsx'],
      },
      'import/resolver': {
        typescript: {},
        typescript: true,
        node: true,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: '.',
      },
    },
    rules: {
      ...typescript.configs['recommended-requiring-type-checking'].rules,
    },
  },
];
