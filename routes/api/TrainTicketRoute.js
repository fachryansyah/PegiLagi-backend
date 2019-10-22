const express = require("express")
const Router = express.Router()
const TrainTicketController = require("../../app/Http/Controllers/TrainTicketController")

Router
    .get("/", TrainTicketController.getTrainTicket)

module.exports = Router