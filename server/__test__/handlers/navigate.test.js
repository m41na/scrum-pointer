const { landingPage } = require('../../handlers/navigate')
const mockRequest = require('../../__mock__/request')
const mockResponse = require('../../__mock__/response')

describe('test navigation functions', () => {
  const request = mockRequest()
  const response = mockResponse()

  test('verify that the home page is index.html', () => {
    landingPage(request, response)

    expect(response.sendFile).toHaveBeenCalledTimes(1)
    expect(response.sendFile.mock.results[0].value).toContain('index.html')
  })
})
