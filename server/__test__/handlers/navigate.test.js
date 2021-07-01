const { landingPage } = require('../../handlers/navigate')
const mockRequest = require('../mocks/request')
const mockResponse = require('../mocks/response')

describe('test navigation functions', () => {
  const request = mockRequest()
  const response = mockResponse()

  test('verify that the home page is index.html', () => {
    landingPage(request, response)

    expect(response.sendFile).toHaveBeenCalledTimes(1)
    expect(response.sendFile.mock.results[0].value).toContain('build/index.html')
  })
})
