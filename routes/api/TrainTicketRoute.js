const express = require("express")
const Router = express.Router()
const TrainTicketController = require("../../app/Http/Controllers/TrainTicketController")

Router
    .get("/", TrainTicketController.getTrainTicket)
    .post("/order", TrainTicketController.orderTrainTicket)
    .post("/create", TrainTicketController.createTrainTicket)

module.exports = Router