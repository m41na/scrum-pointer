const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const secrets = require('./secrets')
const DB_DATA_DIR = './db'
const DB_INIT_SCHEMA = './db/init-schema.sql'
const DB_INIT_DATA = './db/init-data.sql'

const resolveDB = () => `${DB_DATA_DIR}/${secrets.DB_USER}`

const initDB = async () => {
  const initSchema = fs.readFileSync(DB_INIT_SCHEMA).toString()
  connect().then(db => {
    db.run(initSchema, (initErr) => {
      if (initErr) {
        // Table already created
      } else {
        // Table just created, creating some rows
        const initData = fs.readFileSync(DB_INIT_DATA).toString().split(';')
        db.serialize(() => {
          db.run('BEGIN TRANSACTION;')
          initData.forEach(insert => {
            db.run(insert, insertErr => {
              console.log(insertErr.message)
            })
          })
          db.run('COMMIT;')
          disconnect(db)
        })
      }
    })
  }).catch(err => {
    console.log(err)
  })
}

const selectOne = async (query) => {
  connect().then(db => {
    db.serialize(() => {
      const result = []
      db.each(query, (err, row) => {
        if (err) {
          console.error(err.message)
          disconnect(db)
          return Promise.reject(err)
        }
        result.push(row)
      })
      disconnect(db)
      return Promise.resolve(result)
    })
  }).catch(err => {
    console.log(err)
  })
}

const selectMany = async (query) => {
  connect().then(db => {
    db.serialize(() => {
      db.all(query, (err, rows) => {
        if (err) {
          console.error(err.message)
          disconnect(db)
          return Promise.reject(err)
        }
        disconnect(db)
        return Promise.resolve(rows)
      })
    })
  })
    .catch(err => {
      console.log(err)
    })
}

const connect = async () => {
  const db = new sqlite3.Database(resolveDB(), (err) => {
    if (err) {
      console.error(err.message)
      return Promise.reject(err)
    }
    console.log('Connected to the database.')
  })
  return Promise.resolve(db)
}

const disconnect = (db) => {
  db.close((err) => {
    if (err) {
      console.error(err.message)
    }
    console.log('Close the database connection.')
  })
}

const createUser = async (params) => {
  const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
  const { name, email, password } = params
  connect().then(db => {
    db.run(sql, [name, email, password], function (err, result) {
      if (err) {
        disconnect(db)
        return Promise.reject(err)
      }
      disconnect(db)
      return Promise.resolve(result)
    })
  })
}

module.exports = {
  initDB,
  selectOne,
  selectMany,
  createUser
}
