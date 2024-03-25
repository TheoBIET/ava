import { rmSync } from 'node:fs'
import { defineConfig } from 'vite'
import path from 'node:path'
import pkg from './package.json'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  rmSync('build', { recursive: true, force: true });

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      react(),
      electron({
        main: {
          entry: 'app/main.ts',
          vite: {
            build: {
              outDir: 'build',
              minify: isBuild,
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        preload: {
          input: path.join('app/preload.ts'),
          vite: {
            build: {
              outDir: 'build/preload',
              minify: isBuild,
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          }
        },
        renderer: {},
      }),
    ],
  }
})