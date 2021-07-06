const { connect, disconnect } = require('./repository')

const createUser = (params) => {
  const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
  const { name, email, password } = params
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.run(sql, [name, email, password], function (err) {
        if (err) {
          disconnect(db)
            .then(() => reject(err))
            .catch(reject)
        } else {
          disconnect(db)
            .then(() => resolve({ ...params, id: this.lastID }))
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
  createUser
}
