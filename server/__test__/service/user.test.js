const { dbRepository, connectSuccess, disconnectSuccess } = require('../../__mock__/db')

const mockRepoSuccess = () => dbRepository(connectSuccess, disconnectSuccess)

require('../../service/repository')
jest.mock('../../service/repository', () => mockRepoSuccess())
const { createUser } = require('../../service/user')

describe('test user repository functions', () => {
  test('test createUser successfully', async () => {
    const res = await createUser({ name: 'steve', email: 'steve@email.com', password: 'secret' })
    expect(res).toMatchObject({ id: 1, name: 'steve', email: 'steve@email.com', password: 'secret' })
  })
})
