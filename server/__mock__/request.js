const mockRequest = jest.fn(() => {
  const req = {}
  req.status = jest.fn()
  return req
})

module.exports = mockRequest
