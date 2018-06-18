const pg = require('pg')
const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/plantr')

const Vegetable = db.define("vegetable", {
  name: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  planted_on: {
    type: Sequelize.DATE
  }
})

const Gardener = db.define("gardener", {
  name : {
    type: Sequelize.STRING
  },
  age : {
    type: Sequelize.INTEGER
  }
})

const Plot = db.define("plot", {
  size: {
    type: Sequelize.INTEGER
  },
  shaded: {
    type: Sequelize.BOOLEAN
  }
})



Plot.belongsTo(Gardener)
Gardener.hasMany(Plot)
Vegetable.belongsToMany(Plot, {through: 'vegePlot'})
Plot.belongsToMany(Vegetable, {through: 'vegePlot'})
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})



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









module.exports = {db, Vegetable,Gardener, Plot }
