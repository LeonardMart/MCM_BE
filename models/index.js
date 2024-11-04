"use strict";
const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize.authenticate().then(() => {
    console.log("connected...");
}).catch(err => {
    console.log("error: ", err);
});

const db = {};

db.studio = require("./studio.js")(sequelize, DataTypes)
db.film = require("./film.js")(sequelize, DataTypes)
db.showtime = require("./showtime.js")(sequelize, DataTypes)
db.ticket = require("./ticket.js")(sequelize, DataTypes)

console.log("tes", db)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
