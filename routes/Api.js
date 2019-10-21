const express = require("express")
const Router = express.Router()
const SampleRoute = require("./api/SampleRoute")


Router.use("/sample", SampleRoute)

module.exports = Router;