const {
  initDB,
  selectOne,
  selectMany,
  createUser
} = require('../service/repository')

const initializeDB = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  return initDB()
}

const selectSingle = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  return selectOne(req.params.query)
}

const selectCollection = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  return selectMany(req.params.query)
}

const createUserRecord = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  return createUser(req.params.params)
}

module.exports = {
  initializeDB,
  selectSingle,
  selectCollection,
  createUserRecord
}
