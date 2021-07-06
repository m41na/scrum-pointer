const { connect, disconnect } = require('./repository')

const createTeam = (params) => {
  const sql = 'INSERT INTO team (name, organizer) VALUES (?,?)'
  const { name, organizer } = params
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.run(sql, [name, organizer], function (err) {
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

const joinScrum = (params) => {
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
  createTeam,
  joinScrum
}
