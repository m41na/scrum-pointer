const {
  initialize,
  selectOne,
  selectMany
} = require('../service/repository')
const { createUser } = require('../service/user')
const { createTeam, joinScrum } = require('../service/team')
const { createPlayer } = require('../service/player')
const { joinParty, leaveParty, saveEvent } = require('../service/events')

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

const createTeamRecord = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  await createTeam(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const createPlayerRecord = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  await createPlayer(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const joinScrumRecord = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  await joinScrum(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const joinPartyRecord = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  await joinParty(req.params.participant)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const leavePartyRecord = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  await leaveParty(req.params.participant)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const saveEventRecord = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  await saveEvent(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const selectPartyEvents = async (req, res) => {
  console.log(req.params)
  const { token } = res.locals
  console.log(token)
  const { team } = req.params
  const query = [
    'select e.*, u.name from events e ',
    'inner join player p on p.id = e.participant ',
    'inner join user u on p.user = u.id ',
    'where p.team = ?'].join()
  await selectMany(query, [team])
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
  createUserRecord,
  createTeamRecord,
  createPlayerRecord,
  joinScrumRecord,
  joinPartyRecord,
  leavePartyRecord,
  saveEventRecord,
  selectPartyEvents
}
