const mockResponse = jest.fn(() => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn()
  res.send = jest.fn((text) => text)
  res.sendFile = jest.fn((file) => file)
  return res
})

module.exports = mockResponse
