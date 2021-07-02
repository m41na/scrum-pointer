const {
  initialize,
  selectOne,
  selectMany,
  createUser
} = require('../service/repository')

const initializeDB = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  await initialize()
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const selectSingle = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  await selectOne(req.body.query, [req.params.id])
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const selectCollection = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  selectMany(req.body.query)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const createUserRecord = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  await createUser(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

module.exports = {
  initializeDB,
  selectSingle,
  selectCollection,
  createUserRecord
}
