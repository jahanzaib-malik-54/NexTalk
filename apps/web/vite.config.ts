import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic', fastRefresh: false })],
  resolve: {
    alias: [
      {
        find: /^@nextalk\/(.*)$/,
        replacement: path.resolve(__dirname, `../../packages/$1/src`),
      },
    ],
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    deps: {
      inline: ['@testing-library/user-event'],
    },
  },
})
