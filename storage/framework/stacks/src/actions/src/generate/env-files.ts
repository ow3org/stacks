import { path as p } from '@stacksjs/path'
import { storage } from '@stacksjs/storage'
import { env as e, enums } from '@stacksjs/env'
import { logger } from '@stacksjs/logging'
import { envKeys } from '../../../../../stack/env'

logger.log('Generating type env files...')

// generate ./storage/framework/types/env.d.ts file from .env
const envTypes = `
// This file is auto-generated by Stacks. Do not edit this file manually.
// If you want to change the environment variables, please edit the .env file.
//
// For more information, please visit: https://stacksjs.org/docs

declare module 'bun' {
  namespace env {
    ${envKeys.map((key) => {
      let type: string | undefined = typeof e[key]
      let value: string | boolean | number | undefined = e[key]

      if (!value) {
        if (enums[key]) {
          type = enums[key]?.map(item => `'${item}'`).join(' | ')
          value = enums[key]?.[0] // default to the first enum value
        }
 else {
          switch (type) {
            case 'number':
              value = '0'
              break
            case 'boolean':
              value = false
              break
            default:
              value = ''
          }
        }
      }

      type = 'string'
      if (typeof value === 'string') {
        if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
          type = 'boolean'
        }
        else if (!Number.isNaN(Number.parseFloat(value)) && Number.isFinite(Number(value))) {
          type = 'number'
        }
        else if (enums[key]) {
          // @ts-expect-error enums[key] is defined
          type = enums[key].map(item => `'${item}'`).join(' | ')
        }
      }

      else if (typeof value === 'number') {
        type = 'number'
      }

      else if (typeof value === 'boolean') {
        type = 'boolean'
      }

      return `const ${key}: ${type}`
    }).join('\n    ')}
  }
}
`

await storage.writeFile(p.projectStoragePath('framework/types/env.d.ts'), envTypes)

logger.log('  - ./storage/framework/stacks/env.ts')

// generate ./storage/framework/stacks/env.ts file based on Bun.env
const env = `
// This file is auto-generated by Stacks. Do not edit this file manually.
// If you want to change the environment variables, please edit the .env file.
//
// For more information, please visit: https://stacksjs.org/docs

export const envKeys = [
  ${envKeys.map(key => `'${key}'`).join(',\n  ')}
] as const

export type EnvKey = typeof envKeys[number]
`

await storage.writeFile(p.projectStoragePath('framework/stacks/env.ts'), env)

logger.log('  - ./storage/framework/stacks/env.d.ts')