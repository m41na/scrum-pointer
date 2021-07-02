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

const initialize = () => {
  const initSchema = fs.readFileSync(DB_INIT_SCHEMA).toString()
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.run(initSchema, (initErr) => {
        if (initErr) {
          // Table already created
          return reject(initErr)
        }
        // Table just created, creating some rows
        const initData = fs.readFileSync(DB_INIT_DATA).toString().split(';')
        db.serialize(() => {
          db.run('BEGIN TRANSACTION;')
          initData.forEach(insert => {
            db.run(insert.trim(), insertErr => {
              if (insertErr) {
                console.log(insertErr.message)
              } else {
                console.log(`successful run: ${insert}`)
              }
            })
          })
          db.run('COMMIT;')
          disconnect(db)
            .then(() => resolve({ result: 'successfully initialized' }))
            .catch(reject)
        })
      })
    }).catch(err => {
      console.log(err)
      return reject(err)
    })
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

const selectMany = (query) => {
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.serialize(() => {
        db.all(query, (err, rows) => {
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

const createUser = (params) => {
  const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?); select last_insert_rowid()'
  const { name, email, password } = params
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.run(sql, [name, email, password], (err, result) => {
        if (err) {
          disconnect(db)
            .then(() => reject(err))
            .catch(reject)
        } else {
          disconnect(db)
            .then(() => resolve({ ...params, id: result }))
            .catch(reject)
        }
      })
    })
      .catch(err => {
        console.log(err)
        return reject(err)
      })
  })
}

module.exports = {
  initialize,
  selectOne,
  selectMany,
  createUser
}
