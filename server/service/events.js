const { connect, disconnect, selectOne } = require('./repository')

const commitEvent = (params) => {
  const sql = 'INSERT INTO events (participant, status, payload) VALUES (?, ?, ?)'
  const { participant, status, payload } = params
  return new Promise((resolve, reject) => {
    connect().then(db => {
      db.run(sql, [participant, status, payload], function (err) {
        if (err) {
          disconnect(db)
            .then(() => reject(err))
            .catch(reject)
        } else {
          disconnect(db)
            .then(() => resolve({ ...params }))
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

const joinParty = async (participant) => {
  const status = await selectOne('select status from events where participant = ?')
  if (status !== 'joined') {
    return commitEvent({ participant, status: 'joined', payload: '' })
  } else {
    throw Error('You need to first join the party to play')
  }
}

const leaveParty = async (participant) => {
  const status = await selectOne('select status from events where participant = ?')
  if (status === 'joined') {
    return commitEvent({ participant, status: 'bailed', payload: '' })
  } else {
    throw Error('You cannot leave a party you have not yet joined')
  }
}

const saveEvent = async ({ participant, payload }) => {
  const status = await selectOne('select status from events where participant = ?')
  if (status === 'joined') {
    return commitEvent({ participant, status, payload })
  } else {
    throw Error('You need to first join the party to play')
  }
}

module.exports = {
  joinParty,
  leaveParty,
  saveEvent
}
