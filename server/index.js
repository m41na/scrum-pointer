const express = require('express')
const timeout = require('connect-timeout')
const path = require('path')
const cors = require('cors')

const morgan = require('morgan')
const router = require('./routes')

const app = express()

const port = process.env.PORT || 80 // default port is 80
const timeOut = process.env.TIME_OUT || 120000

function initialize (expr) {
  expr.use(cors())
  expr.use(morgan('tiny'))
  expr.use(express.json())
  expr.use(timeout(timeOut))
  expr.use(router)
  expr.use(express.static(path.join(__dirname, '../build')))
}

function serve (expr) {
  initialize(expr)
  expr.listen(port, () => console.log(`Express is listening on port ${port}.`))
}

serve(app)
