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
 */
export async function sign(tags: string[], password: string): Promise<boolean> {
  core.startGroup('List images')

  const images = await exec('docker', { args: ['images'] })
  core.info('Available images: \n' + images.stdout)
  core.endGroup()

  let failed = false

  core.startGroup('Signing and pushing images')
  for (const tag of tags) {
    const { code } = await signTag(tag, password)
    failed = failed || code !== 0 // Fail when the return code is NOT 0
  }

  core.endGroup()

  return failed
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
