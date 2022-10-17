import { defineConfig } from 'vite'
import type { ViteConfig } from 'types'
import { examplesPath } from 'helpers'
import { uiEngine } from 'stacks'

const config: ViteConfig = {
  root: examplesPath('vue-components'),

  server: {
    port: 3333,
    open: true,
  },

  plugins: [
    uiEngine(),
  ],
}

export default defineConfig(() => {
  return config
})
