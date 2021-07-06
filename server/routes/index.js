const express = require('express')

const router = express.Router()

const { landingPage } = require('../handlers/navigate')
const {
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
} = require('../handlers/persistence')
const { retrieveToken } = require('../middleware/tokens')

router.get(['/', '/app/*'], landingPage)
router.get('/db/init', retrieveToken, initializeDB)
router.post('/db/id/:id', retrieveToken, selectSingle)
router.post('/db/list', retrieveToken, selectCollection)
router.post('/db/user', retrieveToken, createUserRecord)
router.post('/db/team', retrieveToken, createTeamRecord)
router.post('/db/player', retrieveToken, createPlayerRecord)
router.post('/db/participant', retrieveToken, joinScrumRecord)
router.post('/db/party/join', retrieveToken, joinPartyRecord)
router.post('/db/party/leave', retrieveToken, leavePartyRecord)
router.post('/db/party/event', retrieveToken, saveEventRecord)
router.get('/db/party/:team', retrieveToken, selectPartyEvents)

module.exports = router
