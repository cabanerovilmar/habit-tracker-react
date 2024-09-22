/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*'],
      },
      includeAssets: ['**/*'],
      manifest: {
        theme_color: '#339af0',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        name: 'Entalpiya',
        short_name: 'Entalpiya',
        description: 'Entalpiya | Prepare for Board Exam',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large dependencies into separate chunks
          katex: ['katex'],
          react: ['react', 'react-dom'], // Example splitting React into its own chunk
          reactMarkdown: ['react-markdown'],
          zustand: ['zustand'],
          mantine: ['@mantine/core', '@mantine/hooks'],
          reactRouterDom: ['react-router-dom'],
          iconify: ['@iconify/react'],
          dateFns: ['date-fns'],
          useHooksTs: ['usehooks-ts'],
          // Add more libraries as needed
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts', 'src/**/*.tsx'], // Include only files from src
      reporter: ['text', 'json', 'html'], // Use desired reporters
      reportsDirectory: './coverage', // Output folder for coverage
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/core/presentation/store/logger.ts',
        'src/**/*.spec.ts',
        'src/**/*.spec.tsx',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
      ],
    },
  },
})
