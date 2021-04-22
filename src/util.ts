import * as core from '@actions/core'
/**
 *
 * Parse a string of tags into a usable array.
 * This string can be seperated by newline, space or comma
 *
 * @param data A string of tags
 */
export function tags2array(data: string): string[] {
  return data.split(/[,\s]/g)
}

/**
 * Get all tags from github to sign
 * @returns Returns all tags to be signed
 */
export function getTags(): string {
  let tags = core.getInput('tags')

  return tags
}
