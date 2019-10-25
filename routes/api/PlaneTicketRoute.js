const express = require("express")
const Router = express.Router()
const PlaneTicketController = require("../../app/Http/Controllers/PlaneTicketController")

Router
    .get("/search", PlaneTicketController.searchPlaneTicket)
    .post("/order", PlaneTicketController.orderPlaneTicket)
    .post("/create", PlaneTicketController.createPlaneTicket)

module.exports = Router