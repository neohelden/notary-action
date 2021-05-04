import * as core from '@actions/core'
import exec from './exec'

const env = {
  DOCKER_CONTENT_TRUST: '1',
  DOCKER_CONTENT_TRUST_SERVER: core.getInput('registry'),
}

/**
 * Signs specific tags and pushes them
 * @param tags Sign an array of tags
 * @param password The password used for the key
 *
 * @throws An error on abnormal exit
 */
export async function sign(tags: string[], password: string): Promise<void> {
  core.startGroup('List images')

  await exec('docker', { args: ['images'] })
  core.endGroup()

  core.startGroup('Signing and pushing images')
  for (const tag of tags) {
    const { code, stderr } = await signTag(tag, password)
    if (code !== 0) {
      throw stderr
    }
  }

  core.endGroup()
}

/**
 * Pushes a specific tag and signs it
 * @param tag The tag to push
 * @param password The password for the key
 */
async function signTag(tag: string, password: string) {
  core.info('Signing tag ' + tag)

  const realenv = Object.assign(
    { DOCKER_CONTENT_TRUST_REPOSITORY_PASSPHRASE: password },
    env
  )

  const obj = await exec('docker', { env: realenv, args: ['push', tag] })

  core.debug(`Tag ${tag} signed`)

  return obj
}
