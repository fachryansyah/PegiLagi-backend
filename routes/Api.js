const express = require("express")
const Router = express.Router()
const SampleRoute = require("./api/SampleRoute")
const AuthRoute = require("./api/AuthRoute")
const PlaneTicketRoute = require("./api/PlaneTicketRoute")
const TrainRoute = require("./api/TrainRoute")
const TrainTicketRoute = require("./api/TrainTicketRoute")

Router.use("/auth", AuthRoute)
Router.use("/plane-ticket", PlaneTicketRoute)
Router.use("/train", TrainRoute)
Router.use("/train-ticket", TrainTicketRoute)
Router.use("/sample", SampleRoute)

module.exports = Router