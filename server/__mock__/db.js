function DB () {
  this.lastID = 1

  this.success = (query, params, callback) => {
    console.log(`db connect => query: ${query}, params: ${params}`)
    const runCallback = callback.bind(this)
    runCallback(null)
  }

  this.failure = (query, params, callback) => {
    console.log(`db connect => query: ${query}, params: ${params}`)
    const runCallback = callback.bind(this)
    runCallback(Error('we got issues'))
  }

  this.run = () => { } // undefined behavior - needs to be overriden
}

const connectSuccess = (db) => {
  console.log(`connecting db ${db}`)
  db.run = db.success
  return Promise.resolve(db)
}

const connectFailure = (db) => {
  console.log(`connecting db ${db}`)
  db.run = db.failure
  return Promise.resolve(db)
}

const disconnectSuccess = () => {
  console.log('disconnecting db')
  return Promise.resolve(true)
}

const dbRepository = (onConnect, onDisconnect) => {
  const db = new DB()
  return ({
    connect: () => onConnect(db),
    disconnect: () => onDisconnect(db),
    selectOne: () => onSelectOne
  })
}

const onSelectOne = (query, params) => {
  console.log(`onSelectOne => query: ${query}, params: ${params}`)
  return jest.fn().mockRejectedValue(true)
}

module.exports = {
  connectSuccess,
  connectFailure,
  disconnectSuccess,
  dbRepository
}
