const mockRequest = require('../mocks/request')
const mockResponse = require('../mocks/response')

jest.mock('../../config/jwtAuth', () => ({
  jwt: {
    getToken: () => Promise.resolve('valid token')
  }
}))
const { retrieveToken } = require('../../middleware/tokens')

describe('verify that next() is called when getToken is successful', () => {
  const request = mockRequest()
  const response = mockResponse()
  const next = jest.fn()

  test('expect next to be called', async () => {
    await retrieveToken(request, response, next)
    expect(next).toHaveBeenCalledTimes(1)
  })
})
