const express = require("express");
const dotenv = require("dotenv");
const app = require("./routes/app");
const http = require("http");
const cors = require("cors");
const logger = require("./utils/logger");
const db = require("./models");

require("dotenv").config();

app.use(cors(), function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
const port = process.env.PORT || 4001;
const server = http.createServer(app);

db.sequelize
  .authenticate()
  .then(() => logger.info("Database connected successfully"))
  .catch((err) => logger.error("Unable to connect to the database:", err));

server.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
