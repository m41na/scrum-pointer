const { dbRepository, connectSuccess, disconnectSuccess } = require('../../__mock__/db')

const mockRepoSuccess = () => dbRepository(connectSuccess, disconnectSuccess)

require('../../service/repository')
jest.mock('../../service/repository', () => mockRepoSuccess())
const { createTeam, joinScrum } = require('../../service/team')

describe('test user repository functions', () => {
  test('test createTeam successfully', async () => {
    const res = await createTeam({ name: 'bubbles', organizer: 1 })
    expect(res).toMatchObject({ id: 1, name: 'bubbles', organizer: 1 })
  })

  test('test joinScrum successfully', async () => {
    const res = await joinScrum({ user: 1, team: 1 })
    expect(res).toMatchObject({ id: 1, team: 1, user: 1 })
  })
})
