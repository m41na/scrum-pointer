const { dbRepository, connectSuccess, disconnectSuccess } = require('../../__mock__/db')

const mockRepoSuccess = () => dbRepository(connectSuccess, disconnectSuccess)

require('../../service/repository')
jest.mock('../../service/repository', () => mockRepoSuccess())
const { joinParty, leaveParty, saveEvent } = require('../../service/events')

describe('test events repository functions', () => {
  test('test join party successfully', async () => {
    const res = await joinParty(1).catch(err => err.message)
    expect(res).toMatchObject({ participant: 1, status: 'joined', payload: '' })
  })

  test('test leave party successfully', async () => {
    const res = await leaveParty(1).catch(err => err.message)
    expect(res).toBe('You cannot leave a party you have not yet joined')
  })

  test('test save event successfully', async () => {
    const res = await saveEvent({ participant: 1, payload: '10' }).catch(err => err.message)
    expect(res).toBe('You need to first join the party to play')
  })
})
