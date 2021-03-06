const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const secrets = require('./secrets')
const DB_DATA_DIR = './db'
const DB_INIT_SCHEMA = './db/init-schema.sql'
const DB_INIT_DATA = './db/init-data.sql'

const resolveDB = () => `${DB_DATA_DIR}/${secrets.DB_USER}`

const connect = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(resolveDB(), (err) => {
      if (err) {
        console.error(err.message)
        reject(err)
      } else {
        console.log('Connected to the database.')
        resolve(db)
      }
    })
  })
}

const disconnect = (db) => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.error(err.message)
        reject(err)
      } else {
        console.log('Closed the database connection.')
        resolve({ result: 'successfully disconnected' })
      }
    })
  })
}

const initSchema = () => {
  const schemas = fs.readFileSync(DB_INIT_SCHEMA).toString().split(';')
    .map(schema => schema.trim())
    .filter(schema => schema.length > 0)
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION;')
        schemas.forEach(schema => {
          db.run(schema, (createErr) => {
            if (createErr) {
              console.log(createErr)
            } else {
              console.log(`created table: ${schema}`)
            }
          })
        })
        db.run('COMMIT;')
        disconnect(db)
          .then(() => resolve({ result: 'Successfully created schema' }))
          .catch(reject)
      })
    }).catch(err => {
      console.log(err)
      return reject(err)
    })
  })
}

const initData = () => {
  const data = fs.readFileSync(DB_INIT_DATA).toString().split(';')
    .map(schema => schema.trim())
    .filter(schema => schema.length > 0)
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION;')
        data.forEach(insert => {
          db.run(insert, (insertErr) => {
            if (insertErr) {
              console.log(insertErr)
            } else {
              console.log(`created data record: ${insert}`)
            }
          })
        })
        db.run('COMMIT;')
        disconnect(db)
          .then(() => resolve({ result: 'Successfully create initial data' }))
          .catch(reject)
      })
    }).catch(err => {
      console.log(err)
      return reject(err)
    })
  })
}

const initialize = () => {
  return new Promise((resolve, reject) => {
    initSchema().then(() => initData())
      .then(() => resolve({ result: 'Successfully created schema and added initial data' }))
      .catch(reject)
  })
}

const selectOne = (query, params) => {
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.serialize(() => {
        const result = []
        db.each(query, params, (err, row) => {
          if (err) {
            console.error(err.message)
            disconnect(db)
              .then(() => reject(err))
              .catch(reject)
          } else {
            result.push(row)
          }
        })
        disconnect(db)
          .then(() => resolve(result))
          .catch(reject)
      })
    }).catch(err => {
      console.log(err)
      return reject(err)
    })
  })
}

const selectMany = (query, params) => {
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.serialize(() => {
        db.all(query, params, (err, rows) => {
          if (err) {
            console.error(err.message)
            disconnect(db)
              .then(() => reject(err))
              .catch(reject)
          } else {
            disconnect(db)
              .then(() => resolve(rows))
              .catch(reject)
          }
        })
      })
    })
      .catch(err => {
        console.log(err)
        return reject(err)
      })
  })
}

module.exports = {
  connect,
  disconnect,
  initialize,
  selectOne,
  selectMany
}
