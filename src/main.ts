import { deletePrivateKey, loadKey } from './keys'
import { sign } from './trust'
import { getTags, tags2array } from './util'

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
} else {
  postRun()
}
