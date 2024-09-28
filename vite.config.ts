/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './config/testSetup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: [
        ...(configDefaults.coverage.exclude as string[]),
        'src/mocks',
        'src/main.tsx',
        'src/api.ts',
        'src/App.tsx',
      ],
    },
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true },
  },
});
