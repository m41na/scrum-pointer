const { jwt } = require('../config/jwtAuth')

const retrieveToken = async (req, res, next) => {
  try {
    const token = await jwt.getToken()
    res.locals = { token }
    next()
  } catch (error) {
    console.log(`Unable to generate JWT Token : ${error}`)
    res.status(403).send(`Failed to retrieve jwt tokens - ${error.message}`)
  }
}

module.exports = {
  retrieveToken
}
