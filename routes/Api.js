const express = require("express")
const Router = express.Router()
const SampleRoute = require("./api/SampleRoute")
const AuthRoute = require("./api/AuthRoute")


Router.use("/auth", AuthRoute)
Router.use("/sample", SampleRoute)

module.exports = Router