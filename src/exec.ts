import { ExecOptions, exec as actionsExec } from '@actions/exec'
import { debug } from '@actions/core'
import { inspect } from 'util'

interface ExecResult {
  stdout: string
  stderr: string
  code: number
}

interface ExecOpts {
  args?: string[]
  env?: Record<string, string>
}

/**
 *Execute a command in actions
 * @param command The command to invoke
 * @param param1 Options to execute
 * @returns An object containing information about the command
 */
export default async function exec(
  command: string,
  { args, env }: ExecOpts
): Promise<ExecResult> {
  let stdout = ''
  let stderr = ''

  env = Object.assign(env, process.env)

  const options: ExecOptions = { env }

  args = args || []

  options.listeners = {
    stdout: (data: Buffer) => (stdout += data),
    stderr: (data: Buffer) => (stderr += data),
  }

  debug('Executing ' + command + ' with args ' + inspect(args))
  debug('Using env: ' + inspect(env))

  const code = await actionsExec(command, args, options)

  return {
    stdout,
    stderr,
    code,
  }
}
