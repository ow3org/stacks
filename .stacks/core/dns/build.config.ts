import { alias } from '@stacksjs/alias'
import { defineBuildConfig, entries } from '@stacksjs/development'

export default defineBuildConfig({
  alias,
  entries,

  externals: [
    '@stacksjs/config',
  ],

  clean: false,
  declaration: true,
})
