#!/usr/bin/env node
import cac from 'cac'
import { isProjectCreated } from '@stacksjs/helpers'
import { ExitCode } from '@stacksjs/types'
import { version } from '../package.json'
import { build, create, dev, example, generate, key, make, test, update, utility } from './cli/'

const cli = cac('stacks')

// setup global error handlers
process.on('uncaughtException', errorHandler)
process.on('unhandledRejection', errorHandler)

async function main() {
  // before running any commands, check if the project is already initialized
  await key(cli)

  if (!await isProjectCreated()) {
    await create(cli)
  }
  else {
    await update(cli)
    await generate(cli)
    await dev(cli)
    await build(cli)
    await utility(cli)
    await make(cli)
    await example(cli)
    await test(cli)
  }

  cli.help()
  cli.version(version)

  cli.parse()
}

main()

function errorHandler(error: Error): void {
  let message = error.message || String(error)

  if (process.env.DEBUG || process.env.NODE_ENV === 'development')
    message = error.stack || message

  console.error(message)
  process.exit(ExitCode.FatalError)
}
