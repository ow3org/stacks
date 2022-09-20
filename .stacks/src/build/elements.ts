import { resolve } from 'pathe'
import type { BuildOptions as ViteBuildOptions } from 'vite'
import { defineConfig } from 'vite'
import type { ViteConfig } from '../types'
import alias from '../core/alias'
import { atomicCssEngine, autoImports, components, inspect, uiEngine } from '..'
import { webComponentsLibrary } from '../../../config/library'
import { _dirname } from '../core/fs'

const isWebComponent = true

const config: ViteConfig = {
  root: resolve(_dirname, '../../../components'),

  envPrefix: 'STACKS_',

  server: {
    port: 3333,
    open: true,
  },

  resolve: {
    dedupe: ['vue'],
    alias,
  },

  optimizeDeps: {
    exclude: ['vue', '@vueuse/core'],
  },

  plugins: [
    inspect,

    uiEngine(isWebComponent),

    atomicCssEngine(isWebComponent),

    autoImports,

    components,
  ],

  build: webComponentsBuildOptions(),
}

export function webComponentsBuildOptions(): ViteBuildOptions {
  return {
    outDir: resolve(_dirname, '../../elements/dist'),

    emptyOutDir: true,

    lib: {
      entry: resolve(_dirname, '../components/index.ts'),
      name: webComponentsLibrary.name,
      formats: ['cjs', 'es'],
      fileName: (format: string) => {
        if (format === 'es')
          return 'index.js'

        if (format === 'cjs')
          return 'index.cjs'

        return 'index.?.js'
      },
    },
  }
}

export default defineConfig(({ command }) => {
  if (command === 'serve')
    return config

  // command === 'build'
  return config
})
