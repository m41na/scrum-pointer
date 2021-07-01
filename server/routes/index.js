const express = require('express')

const router = express.Router()

const { landingPage } = require('../handlers/navigate')
const { initializeDB, selectSingle, selectCollection, createUserRecord } = require('../handlers/repository')
const { retrieveToken } = require('../middleware/tokens')

router.get(['/', '/app/*'], landingPage)
router.get('/db/init', retrieveToken, initializeDB)
router.get('/db/one', retrieveToken, selectSingle)
router.get('/db/many', retrieveToken, selectCollection)
router.post('/db/user', retrieveToken, createUserRecord)

module.exports = router
