import process from 'node:process'
import {
  createModel,
  createNotification,
  invoke,
  makeAction,
  makeComponent,
  makeDatabase,
  makeFunction,
  makeLanguage,
  makePage,
  makeStack,
} from '@stacksjs/actions'
import { intro, italic, outro, runCommand } from '@stacksjs/cli'
import { localUrl } from '@stacksjs/config'
import { log } from '@stacksjs/logging'
import { path as p } from '@stacksjs/path'
import type { CLI, MakeOptions } from '@stacksjs/types'
import { ExitCode } from '@stacksjs/types'

export function make(buddy: CLI) {
  const descriptions = {
    action: 'Create a new action',
    model: 'Create a new model',
    component: 'Create a new component',
    page: 'Create a new page',
    function: 'Create a new function',
    language: 'Create a new language',
    database: 'Create a new database',
    migration: 'Create a new migration',
    factory: 'Create a new factory',
    notification: 'Create a new notification',
    name: 'The name of the action',
    stack: 'Create a new stack',
    certificate: 'Create a new SSL Certificate',
    select: 'What are you trying to make?',
    project: 'Target a specific project',
    verbose: 'Enable verbose output',
  }

  buddy
    .command('make', 'The make command')
    .option('-a, --action [action]', descriptions.action, { default: false })
    .option('-m, --model [model]', descriptions.model, { default: false })
    .option('-c, --component [component]', descriptions.component, { default: false })
    .option('-p, --page [page]', descriptions.page, { default: false })
    .option('-f, --function [function]', descriptions.function, { default: false })
    .option('-l, --language [language]', descriptions.language, { default: false })
    .option('-d, --database [database]', descriptions.database, { default: false })
    .option('-m, --migration [migration]', descriptions.migration, { default: false })
    .option('-f, --factory [factory]', descriptions.factory, { default: false })
    .option('-n, --notification [notification]', descriptions.notification, { default: false })
    .option('-s, --stack [stack]', descriptions.stack, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action(async (options: MakeOptions) => {
      log.debug('Running `buddy make` ...', options)

      const name = buddy.args[0]

      if (!name) {
        log.error('You need to specify a name. Read more about the documentation here.')
        process.exit()
      }

      // TODO: uncomment this when prompt is ready
      // if (hasNoOptions(options)) {
      //   let answers = await prompt.require()
      //     .multiselect(descriptions.select, {
      //       options: [
      //         { label: 'Page', value: 'page' },
      //         { label: 'Function', value: 'function' },
      //         { label: 'Component', value: 'component' },
      //         { label: 'Notification', value: 'notification' },
      //         { label: 'Language', value: 'language' },
      //         { label: 'Database', value: 'database' },
      //         { label: 'Migration', value: 'migration' },
      //         { label: 'Factory', value: 'factory' },
      //         { label: 'Stack', value: 'stack' },
      //       ],
      //     })
      //
      //   if (answers !== null)
      //     process.exit(ExitCode.InvalidArgument)
      //
      //   if (isString(answers))
      //     answers = [answers]
      //
      //   // creates an object out of array and sets answers to true
      //   options = answers.reduce((a: any, v: any) => ({ ...a, [v]: true }), {})
      // }

      await invoke(options)

      process.exit(ExitCode.Success)
    })

  buddy
    .command('make:component [name]', descriptions.component)
    .option('-n, --name [name]', descriptions.name, { default: false })
    .option('-p, --project [project]', descriptions.project, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action(async (name, options: MakeOptions) => {
      log.debug('Running `buddy make:component` ...', options)

      name = name ?? options.name
      options.name = name

      if (!name) {
        log.error('You need to specify a name. Read more about the documentation here.')
        process.exit()
      }

      await makeComponent(options)
    })

  buddy
    .command('make:database [name]', descriptions.database)
    .option('-n, --name [name]', descriptions.name, { default: false })
    .option('-p, --project [project]', descriptions.project, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action((name, options: MakeOptions) => {
      log.debug('Running `buddy make:database` ...', options)

      name = name ?? options.name
      options.name = name

      if (!name) {
        log.error('You need to specify a database name via the `--name` option, or as the command’s argument.')
        log.info('Example: `buddy make:database my-cool-database`')
        log.info('Or: `buddy make:database --name=my-cool-database`')
        log.info('Read more about the documentation here: https://stacksjs.org/docs/make/database')
        process.exit()
      }

      makeDatabase(options)
    })

  buddy
    .command('make:factory [name]', descriptions.factory)
    .option('-n, --name [name]', descriptions.name, { default: false })
    .option('-p, --project [project]', descriptions.project, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action((name, options: MakeOptions) => {
      log.debug('Running `buddy make:factory` ...', options)

      name = name ?? options.name
      options.name = name

      if (!name) {
        log.error('You need to specify a name. Read more about the documentation here.')
        process.exit()
      }

      // makeFactory(options)
    })

  buddy
    .command('make:view [name]', descriptions.page)
    .alias('make:page [name]')
    .option('-n, --name [name]', descriptions.name, { default: false })
    .option('-p, --project [project]', descriptions.project, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action(async (name, options: MakeOptions) => {
      log.debug('Running `buddy make:view` ...', options)

      name = name ?? options.name
      options.name = name

      if (!name) {
        log.error('You need to specify a name. Read more about the documentation here.')
        process.exit()
      }

      await makePage(options)
    })

  buddy
    .command('make:function [name]', descriptions.function)
    .option('-n, --name [name]', descriptions.name, { default: false })
    .option('-p, --project [project]', descriptions.project, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action(async (options: MakeOptions) => {
      log.debug('Running `buddy make:function` ...', options)

      await makeFunction(options)
    })

  buddy
    .command('make:lang [name]', descriptions.language)
    .option('-n, --name [name]', descriptions.name, { default: false })
    .option('-p, --project [project]', descriptions.project, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action(async (name, options: MakeOptions) => {
      log.debug('Running `buddy make:lang` ...', options)

      name = name ?? options.name
      options.name = name

      if (!name) {
        log.error('You need to specify a name. Read more about the documentation here.')
        process.exit()
      }

      await makeLanguage(options)
    })

  buddy
    .command('make:notification [name]', descriptions.notification)
    .option('-n, --name [name]', descriptions.name, { default: false })
    .option('-e, --email', 'Is it an email notification?', { default: true })
    .option('-c, --chat', 'Is it a chat notification?', { default: false })
    .option('-s, --sms', 'Is it a SMS notification?', { default: false })
    .option('-p, --project [project]', descriptions.project, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action(async (name, options: MakeOptions) => {
      log.debug('Running `buddy make:notification` ...', options)

      const perf = await intro('buddy make:notification')

      name = name ?? options.name
      options.name = name

      if (!name) {
        log.error('You need to specify a name. Read more about the documentation here.')
        process.exit()
      }

      const result = await createNotification(options)

      if (!result) {
        await outro('While running the make:notification command, there was an issue', {
          startTime: perf,
          useSeconds: true,
        })
        process.exit()
      }

      await outro(`Created your ${italic(name)} notification.`, {
        startTime: perf,
        useSeconds: true,
      })
      process.exit(ExitCode.Success)
    })

  buddy
    .command('make:stack [name]', descriptions.stack)
    .option('-n, --name [name]', descriptions.name, { default: false })
    .option('-p, --project [project]', descriptions.project, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action((name, options: MakeOptions) => {
      log.debug('Running `buddy make:stack` ...', options)

      name = name ?? options.name
      options.name = name

      if (!name) {
        log.error('You need to specify a name. Read more about the documentation here.')
        process.exit()
      }

      makeStack(options)
    })

  buddy
    .command('make:action [name]', descriptions.action)
    .option('-n, --name [name]', descriptions.name, { default: false })
    .option('-p, --project [project]', descriptions.project, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action(async (name, options: MakeOptions) => {
      log.info('Running `buddy make:action` ...')
      log.debug('Running `buddy make:action` ...', name, options)

      name = name ?? options.name
      options.name = name

      if (!name) {
        log.error('You need to specify a name. Read more about the documentation here.')
        process.exit()
      }

      await makeAction(options)
    })

  buddy
    .command('make:model [name]', descriptions.model)
    .option('-n, --name [name]', descriptions.name, { default: false })
    .option('-p, --project [project]', descriptions.project, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action(async (name, options: MakeOptions) => {
      log.debug('Running `buddy make:model` ...', options)

      name = name ?? options.name
      options.name = name

      if (!name) {
        log.error('You need to specify a model name')
        process.exit()
      }

      await createModel(options)
    })

  buddy
    .command('make:migration [name]', descriptions.migration)
    .option('-n, --name [name]', descriptions.name, { default: false })
    .option('-p, --project [project]', descriptions.project, { default: false })
    .option('--verbose', descriptions.verbose, { default: false })
    .action((name, options: MakeOptions) => {
      log.debug('Running `buddy make:migration` ...', options)

      name = name ?? options.name
      options.name = name

      if (!name) {
        log.error('You need to specify a migration name')
        process.exit()
      }

      // log.info(path)
    })

  buddy
    .command('make:certificate', descriptions.certificate)
    .alias('make:cert')
    .example('buddy make:certificate')
    .action(async (options: MakeOptions) => {
      log.debug('Running `buddy make:certificate` ...', options)

      const domain = await localUrl()
      log.info(`Creating SSL certificate...`)

      await runCommand(`tlsx ${domain}`, {
        cwd: p.projectStoragePath('keys'),
      })

      log.success('Certificate created')

      log.info(`Installing SSL certificate...`)
      await runCommand(`tlsx -install`, {
        cwd: p.projectStoragePath('keys'),
      })
      log.success('Certificate installed')
    })

  buddy.on('make:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', buddy.args.join(' '))
    process.exit(1)
  })
}

// function hasNoOptions(options: MakeOptions) {
//   return !options.component && !options.page && !options.function && !options.language && !options.database && !options.migration && !options.notification && !options.stack
// }
