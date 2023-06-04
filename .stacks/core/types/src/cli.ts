/**
 * The parsed command-line arguments
 */

import type { Ora } from 'ora'
import type { ExecaReturnValue } from 'execa'
import type { Err, Ok } from './errors'

export type CommandReturnValue = ExecaReturnValue<string>
export type CommandResult = Ok<ExecaReturnValue<string>, Error | void> | Err<ExecaReturnValue<string>, Error | string | void>

export interface OutroOptions extends CliOptions {
  type?: 'success' | 'error' | 'warning' | 'info'
  startTime?: number
  useSeconds?: boolean
  isError?: boolean
  quiet?: boolean
}

export interface IntroOptions {
  /**
   * @default true
   */
  showPerformance?: boolean

  /**
   * @default false
   */
  quiet: boolean
}

type SpinnerOptions = Ora

export type CliOptionsKeys = keyof CliOptions

/**
 * The CLI Options used in `./config/cli.ts`.
 */
export interface UserCliOptions {
  name?: string
  command?: string
  description?: string
}

/**
 * The options to pass to the CLI.
 */
export interface CliOptions {
  /**
   * **Quiet Output**
   *
   * When your application is in "quiet"-mode, a different level of information
   * like useful outputs for debugging reasons, will be shown.
   * When disabled, it defaults to the "normal experience."
   *
   * @default false
   */
  quiet?: boolean

  /**
   * **Verbose Output**
   *
   * When your application is in "verbose"-mode, a different level of,
   * information like useful outputs for debugging reasons, will be
   * shown. When disabled, it defaults to the "normal experience."
   *
   * @default false
   */
  verbose?: boolean

  /**
   * **Current Work Directory**
   *
   * Based on the `cwd` value, that's where the command...
   *
   * @default projectPath()
   */
  cwd?: string

  /**
   * **Should show loading animation spinner?**
   *
   * Should the command show a loading animation?
   * Please note, when debug mode is enabled,
   * the animation will not show.
   *
   * @default true
   */
  showSpinner?: boolean | SpinnerOptions

  /**
   * **Spinner Text**
   *
   * The text to show when the spinner is shown.
   *
   * @default 'Executing...'
   */
  spinnerText?: string

  /**
   * **Should the command be run inside a shell?**
   *
   * If `true`, runs `command` inside of a shell. Uses `/bin/sh` on UNIX and `cmd.exe`
   * on Windows. A different shell can be specified as a string. The shell should
   * understand the `-c` switch on UNIX or `/d /s /c` on Windows.
   *
   * We recommend against using this option since it is:
   *  - not cross-platform, encouraging shell-specific syntax.
   *  - slower, because of the additional shell interpretation.
   *  - unsafe, potentially allowing command injection.
   *
   * @default false
   */
  shell?: boolean

  /**
   * **Encoding**
   *
   * Encoding type
   *
   * @default 'utf-8'
   */
  encoding?: string
}

export type { Ora as SpinnerOptions } from 'ora'

export type ActionOption = 'types'

/**
 * The options to pass to the Action.
 */
export type ActionOptions = {
  [key in ActionOption]?: boolean;
} & CliOptions

export type BuildOption = 'components' | 'vueComponents' | 'webComponents' | 'elements' | 'functions' | 'docs' | 'pages' | 'stacks' | 'all'
export type BuildOptions = {
  [key in BuildOption]: boolean;
} & CliOptions

export type AddOption = 'table' | 'calendar' | 'all'
export type AddOptions = {
  [key in AddOption]?: boolean;
} & CliOptions

export type CreateStringOption = 'name'
export type CreateBooleanOption = 'ui' | 'components' | 'web-components' | 'vue' | 'pages' | 'functions' | 'api' | 'database'
export type CreateOptions = {
  [key in CreateBooleanOption]: boolean
} & {
  [key in CreateStringOption]: string
} & CliOptions

export type DevOption = 'components' | 'docs' | 'pages' | 'functions' | 'desktop' | 'all'
export type DevOptions = {
  [key in DevOption]: boolean;
} & CliOptions

export type GeneratorOption = 'types' | 'entries' | 'webTypes' | 'customData' | 'ideHelpers' | 'vueCompatibility' | 'componentMeta'
export type GeneratorOptions = {
  [key in GeneratorOption]?: boolean;
} & CliOptions

export type LintOption = 'fix'
export type LintOptions = {
  [key in LintOption]: boolean;
} & CliOptions

export type MakeStringOption = 'name' | 'chat' | 'sms' | 'env'
export type MakeBooleanOption = 'component' | 'page' | 'function' | 'language' | 'database' | 'migration' | 'factory' | 'notification' | 'stack'
export type MakeOptions = {
  [key in MakeBooleanOption]: boolean
} & {
  [key in MakeStringOption]: string
} & CliOptions

export type UpgradeBoolean = 'framework' | 'dependencies' | 'packageManager' | 'node' | 'all' | 'force'
export type UpgradeString = 'version'

export type UpgradeOptions = {
  [key in UpgradeBoolean]: boolean;
} & {
  [key in UpgradeString]: string;
} & CliOptions

export type ExamplesString = 'version'
export type ExamplesBoolean = 'components' | 'vue' | 'webComponents' | 'elements' | 'all' | 'force'
export type ExamplesOption = ExamplesString & ExamplesBoolean | void
export type ExamplesOptions = {
  [key in ExamplesString]: string;
} & {
  [key in ExamplesBoolean]: boolean;
} & CliOptions
export type TestOptions = CliOptions & {
  showReport?: boolean
}

export interface CleanOptions extends CliOptions { }
export interface CommitOptions extends CliOptions { }
export interface KeyOptions extends CliOptions { }
export interface FreshOptions extends CliOptions { }
export interface InspireOptions extends CliOptions { }
export interface ReleaseOptions extends CliOptions { }
export interface PreinstallOptions extends CliOptions { }
export interface PrepublishOptions extends CliOptions { }
export interface TinkerOptions extends CliOptions { }
export interface TypesOptions extends CliOptions { }

export type LibEntryType = 'vue-components' | 'web-components' | 'functions' | 'all'

/**
 * The available npm scripts within the Stacks toolkit.
 */
export const enum NpmScript {
  Build = 'build',
  BuildComponents = 'vite build --config ./core/build/src/vue-components.ts',
  BuildWebComponents = 'build:web-components',
  BuildFunctions = 'build:functions',
  BuildDocs = 'build:docs',
  BuildStacks = 'build:stacks',
  Clean = 'rimraf pnpm-lock.yaml node_modules/ .stacks/**/node_modules .stacks/**/dist',
  Dev = 'dev',
  DevComponents = 'vite --config ./core/build/src/vue-components.ts',
  DevDocs = 'npx vitepress dev ./docs/src',
  DevDesktop = 'dev:desktop',
  DevPages = 'dev:pages',
  DevFunctions = 'dev:functions',
  Fresh = 'fresh',
  Lint = 'eslint .',
  LintFix = 'eslint . --fix',
  LintPackageJson = 'npx publint',
  MakeStack = 'make:stack',
  Test = 'vitest --config vitest.config.ts',
  TestUnit = 'vitest --config vitest.config.ts',
  TestFeature = 'playwright test --config playwright.config.ts',
  TestUi = 'vitest --config vitest.config.ts --ui',
  TestCoverage = 'vitest --config vitest.config.ts --coverage',
  TestTypes = 'vue-npx tsc --noEmit',
  Generate = 'generate',
  GenerateTypes = 'generate:types',
  GenerateEntries = 'generate:entries',
  GenerateVueCompat = 'generate:vue-compatibility',
  GenerateWebTypes = 'generate:web-types',
  GenerateVsCodeCustomData = 'generate:vscode-custom-data',
  GenerateIdeHelpers = 'generate:ide-helpers',
  GenerateComponentMeta = 'generate:component-meta',
  Release = 'release',
  Commit = 'commit',
  Example = 'example',
  ExampleVue = 'example:vue',
  ExampleWebComponents = 'example:web-components',
  KeyGenerate = 'key:generate',
  TypesFix = 'types:fix',
  TypesGenerate = 'types:generate',
  Preinstall = 'preinstall',
  Prepublish = 'prepublish',
  Wip = 'wip',
  UpgradeNode = './.stacks/scripts/setup.sh +nodejs.org',
  UpgradeDependencies = 'pnpm up',
}

export const enum Action {
  Bump = 'bump',
  BuildStacks = 'build/stacks',
  BuildComponentLibs = 'build/component-libs',
  BuildVueComponentLib = 'build-vue-component-lib',
  BuildWebComponentLib = 'build-web-component-lib',
  BuildCli = 'build-cli',
  BuildCore = 'build/core',
  BuildDocs = 'build-docs',
  BuildFunctionLib = 'build-function-lib',
  Changelog = 'changelog',
  Clean = 'clean',
  DevComponents = 'dev/components', // ✅
  DevDocs = 'dev/docs',
  Deploy = 'deploy',
  Fresh = 'fresh',
  GenerateLibraryEntries = 'generate/lib-entries', // ✅
  Inspire = 'inspire',
  KeyGenerate = 'key-generate',
  MakeNotification = 'make-notification',
  Migrate = 'migrate',
  Seed = 'seed',
  Lint = 'lint/index',
  LintFix = 'lint/fix',
  Prepublish = 'prepublish',
  Release = 'release', // ✅
  ShowFeatureTestReport = 'show-feature-test-report',
  Test = 'test',
  TestUi = 'test-ui',
  TestUnit = 'test-unit',
  TestFeature = 'test-feature',
  TestCoverage = 'test-coverage',
  Tinker = 'tinker',
  Typecheck = 'typecheck',
  Upgrade = 'upgrade/index',
  UpgradeNode = 'upgrade/node',
  UpgradePackageManager = 'upgrade/package-manager',
}

export type { CAC as CLI } from 'cac'
