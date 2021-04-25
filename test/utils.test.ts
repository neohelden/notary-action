import { tags2array } from '../src/util'

describe('Github tags', function () {
  it('should detect one tag', function () {
    const tagString = 'repository.github.com/repo:tag1'
    const result = tags2array(tagString)

    expect(Array.isArray(result)).toBeTruthy()
    expect(result).toContain('repository.github.com/repo:tag1')
    expect(result.length).toBe(1)
  })

  it('should detect multiple tags separated by a new line', function () {
    const tagString =
      'repository.github.com/repo:tag1\nrepository.github.com/repo:tag2'
    const result = tags2array(tagString)

    expect(Array.isArray(result)).toBeTruthy()
    expect(result).toContain('repository.github.com/repo:tag1')
    expect(result).toContain('repository.github.com/repo:tag2')
    expect(result.length).toBe(2)
  })

  it('should detect multiple tags separated by a space', function () {
    const tagString =
      'repository.github.com/repo:tag1 repository.github.com/repo:tag2'
    const result = tags2array(tagString)

    expect(Array.isArray(result)).toBeTruthy()
    expect(result).toContain('repository.github.com/repo:tag1')
    expect(result).toContain('repository.github.com/repo:tag2')
    expect(result.length).toBe(2)
  })

  it('should detect multiple tags separated by a comma', function () {
    const tagString =
      'repository.github.com/repo:tag1,repository.github.com/repo:tag2'
    const result = tags2array(tagString)

    expect(Array.isArray(result)).toBeTruthy()
    expect(result).toContain('repository.github.com/repo:tag1')
    expect(result).toContain('repository.github.com/repo:tag2')
    expect(result.length).toBe(2)
  })
})
