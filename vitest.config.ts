import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: process.env.VITEST_INCLUDE
      ? [process.env.VITEST_INCLUDE]
      : process.argv.slice(2).some((a) => !a.startsWith('-') && !a.includes('run'))
      ? ['tests/**/*.test.ts']
      : ['tests/seedIntegrity.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
