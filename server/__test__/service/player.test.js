const { dbRepository, connectSuccess, disconnectSuccess } = require('../../__mock__/db')

const mockRepoSuccess = () => dbRepository(connectSuccess, disconnectSuccess)

require('../../service/repository')
jest.mock('../../service/repository', () => mockRepoSuccess())
const { createPlayer } = require('../../service/player')

describe('test user repository functions', () => {
  test('test createPlayer successfully', async () => {
    const res = await createPlayer({ user: 1, team: 1 })
    expect(res).toMatchObject({ id: 1, team: 1, user: 1 })
  })
})
