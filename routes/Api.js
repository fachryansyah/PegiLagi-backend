const express = require("express")
const Router = express.Router()
const SampleRoute = require("./api/SampleRoute")
const AuthRoute = require("./api/AuthRoute")
const TrainRoute = require("./api/TrainRoute")
const TrainTicketRoute = require("./api/TrainTicketRoute")

Router.use("/auth", AuthRoute)
Router.use("/train", TrainRoute)
Router.use("/trainTicket", TrainTicketRoute)
Router.use("/sample", SampleRoute)

module.exports = Router