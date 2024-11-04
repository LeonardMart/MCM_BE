const router = require("express").Router();
const express = require("express")
require('dotenv').config();

const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/films", require("./filmRoutes"))
app.use("/studios", require("./studioRoutes"))
app.use("/showtimes", require("./showtimeRoutes"))
app.use("/tickets", require("./ticketRoutes"))


module.exports = app;
