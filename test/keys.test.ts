import { generateKeyPairSync } from 'crypto'

describe('Docker keys', () => {
  const OLD_ENV = process.env
  const key = generateKeyPairSync('rsa', { modulusLength: 2048 })

  beforeEach(async () => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('Should load a key', async () => {
    process.env['INPUT_KEY'] = key.privateKey
      .export({ format: 'pem', type: 'pkcs1' })
      .toString()

    process.env['INPUT_keyname'.toUpperCase()] = 'test'

    const { loadKey } = await import('../src/keys')

    const password = await loadKey()

    expect(password).toBeDefined()
  })
})
