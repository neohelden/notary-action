import * as core from '@actions/core'

import { writeFileSync, unlinkSync } from 'fs'
import exec from './exec'
import { join } from 'path'
import { randomBytes } from 'crypto'

const key = core.getInput('key', { required: true })
const keyname = core.getInput('keyname', { required: true })

const KEY_NAME = 'delegation.key'

const KEY_PATH = join(process.cwd(), KEY_NAME)

/**
 * This method will load the key into docker.
 * @returns the password used
 */
export async function loadKey(): Promise<string> {
  core.startGroup('Importing key')
  const securePassword = randomBytes(36).toString('utf-8')

  core.debug('Writing key to ' + KEY_PATH)
  writeFileSync(KEY_PATH, key, { mode: 0o700 })

  await exec('docker', {
    args: ['trust', 'key', 'load', KEY_PATH, '--name', keyname],
    env: {
      DOCKER_CONTENT_TRUST: '1',
      DOCKER_CONTENT_TRUST_REPOSITORY_PASSPHRASE: securePassword,
    },
  })

  core.debug('Removing file')
  unlinkSync(KEY_PATH)

  core.endGroup()
  return securePassword
}

/**
 * Deletes a specific
 * @param gun The ID of the Key
 */
export async function deletePrivateKey(): Promise<void> {
  core.startGroup('Deleting key')
  unlinkSync('.docker/trust')
  core.endGroup()
}
