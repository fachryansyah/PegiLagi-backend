const express = require("express")
const Router = express.Router()
const AirportController = require("../../app/Http/Controllers/AirportController")

Router.get("/", AirportController.getAirport)

module.exports = Router
