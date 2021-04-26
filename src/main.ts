import { deletePrivateKey, loadKey } from './keys'
import { sign } from './trust'
import { getTags, tags2array } from './util'
import * as core from '@actions/core'

/**
 * Main entry point of the program
 */
async function run() {
  // Write the key
  const password = await loadKey()

  const tags = tags2array(getTags())

  await sign(tags, password)
}

async function postRun() {
  await deletePrivateKey()
}

if (!process.env.STATE_isPost) {
  run()
  core.saveState('isPost', 'true')
} else {
  postRun()
}
