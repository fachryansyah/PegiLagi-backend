const express = require("express")
const Router = express.Router()
const SampleRoute = require("./api/SampleRoute")
const AuthRoute = require("./api/AuthRoute")
const PlaneTicketRoute = require("./api/PlaneTicketRoute")


Router.use("/auth", AuthRoute)
Router.use("/planeticket", PlaneTicketRoute)
Router.use("/sample", SampleRoute)

module.exports = Router