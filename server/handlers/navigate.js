const path = require('path')

const landingPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'))
}

module.exports = {
  landingPage
}
