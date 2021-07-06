const { connect, disconnect } = require('./repository')

const createPlayer = (params) => {
  const sql = 'INSERT INTO team (user, team) VALUES (?,?)'
  const { user, team } = params
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.run(sql, [user, team], function (err) {
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
  createPlayer
}
