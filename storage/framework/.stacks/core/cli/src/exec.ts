import process from 'node:process'
import { type Result, err, handleError, ok } from '@stacksjs/error-handling'
import type { CliOptions, StacksError, Subprocess, SyncSubprocess } from '@stacksjs/types'
import { ExitCode } from '@stacksjs/types'

/**
 * Execute a command.
 *
 * @param command The command to execute.
 * @param options The options to pass to the command.
 * @returns The result of the command.
 * @example
 * ```ts
 * const result = await exec('ls')
 *
 * if (result.isErr())
 *   console.error(result.error)
 * else
 *   console.log(result)
 * ```
 * @example
 * ```ts
 * const result = await exec('ls', { cwd: '/home' })
 * ```
 */
export async function exec(command: string | string[], options?: CliOptions): Promise<Result<Subprocess, StacksError>> {
  const cmd = Array.isArray(command) ? command : command.match(/(?:[^\s"]+|"[^"]*")+/g)

  if (!cmd)
    return err(handleError(`Failed to parse command: ${cmd}`, options))

  if (options?.verbose)
    // eslint-disable-next-line no-console
    console.log('exec', { command, cmd, options })

  const proc = Bun.spawn(cmd, {
    ...options,
    stdout: options?.silent ? 'ignore' : (options?.stdin ? options.stdin : (options?.stdout || 'inherit')),
    stderr: options?.silent ? 'ignore' : (options?.stderr || 'inherit'),
    detached: options?.background || false,
    cwd: options?.cwd || import.meta.dir,
    // env: { ...e, ...options?.env },
    onExit(_subprocess, exitCode, _signalCode, _error) {
      if (exitCode && exitCode !== ExitCode.Success)
        process.exit(exitCode)
    },
  })

  const exited = await proc.exited
  if (exited === ExitCode.Success)
    return ok(proc)

  return err(handleError(`Failed to execute command: ${cmd.join(' ')}`))
}

/**
 * Execute a command and return result.
 *
 * @param command The command to execute.
 * @returns The result of the command.
 * @example
 * ```ts
 * const result = execSync('ls')
 *
 * if (result.isErr())
 *   console.error(result.error)
 * else
 *   console.log(result)
 * ```
 * @example
 * ```ts
 * const result = execSync('ls', { cwd: '/home' })
 * ```
 */
export function execSync(command: string | string[], options?: CliOptions): Result<SyncSubprocess, Error> {
  const cmd = Array.isArray(command) ? command : command.split(' ')
  const proc = Bun.spawnSync(cmd, {
    ...options,
    stdout: options?.stdout ?? 'inherit',
    stderr: options?.stderr ?? 'inherit',
    cwd: options?.cwd ?? import.meta.dir,
    // env: { ...Bun.env, ...options?.env },
    onExit(_subprocess, exitCode, _signalCode, _error) {
      // console.log('onExit', { subprocess, exitCode, signalCode, error })
      if (exitCode !== ExitCode.Success && exitCode)
        process.exit(exitCode)
    },
  })

  if (proc.success)
    return ok(proc)

  return err(handleError(`Failed to execute command: ${cmd.join(' ')}`))
}