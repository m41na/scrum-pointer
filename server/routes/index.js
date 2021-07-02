const express = require('express')

const router = express.Router()

const { landingPage } = require('../handlers/navigate')
const { initializeDB, selectSingle, selectCollection, createUserRecord } = require('../handlers/persistence')
const { retrieveToken } = require('../middleware/tokens')

router.get(['/', '/app/*'], landingPage)
router.get('/db/init', retrieveToken, initializeDB)
router.post('/db/user/id/:id', retrieveToken, selectSingle)
router.post('/db/user/list', retrieveToken, selectCollection)
router.post('/db/user', retrieveToken, createUserRecord)

module.exports = router
