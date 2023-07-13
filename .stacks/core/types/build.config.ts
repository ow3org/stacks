import { defineBuildConfig, entries } from '@stacksjs/development'
import { alias } from '@stacksjs/alias'

export default defineBuildConfig({
  alias,
  entries,

  externals: [
    '@dinero.js/core',
    '@stacksjs/utils',
    '@dinero.js/currencies',
    'dinero.js',
    'perfect-debounce',
    'rimraf',
  ],

  // rollup: {
  //   inlineDependencies: true,
  // },

  clean: false,
  declaration: true,
})
