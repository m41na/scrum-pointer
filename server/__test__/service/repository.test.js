const { createUser, selectOne } = require('../../service/repository')

jest.mock('../../service/repository', () => ({
  createUser: jest.fn().mockResolvedValue('create'),
  selectOne: jest.fn().mockResolvedValue('select')
}))

describe('test repository functions', () => {
  beforeEach(() => {
    console.log('nothing before')
  })

  afterEach(() => {
    console.log('nothing after')
  })

  test('test create single entity', async () => {
    const res = await createUser()
    expect(res).toBe('create')
  })

  test('test select single record', async () => {
    const res = await selectOne()
    expect(res).toBe('select')
  })
})
