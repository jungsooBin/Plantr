const pg = require('pg')
const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/plantr')


db.sync({force: true})
  .then(() => {
    console.log('db synced')
    db.close()
  })
  .catch(err => {
    console.log('DISASTER!!!!! :(', err)
    db.close()
  } )
  .finally(() => {
    db.close()
  })









module.exports = db
