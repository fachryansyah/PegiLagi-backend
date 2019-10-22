const express = require("express")
const Router = express.Router()
const HotelController = require("../../app/Http/Controllers/HotelController")

Router.get("/", HotelController.getHotel)
Router.get("/d/:id", HotelController.getHotelDetail)

module.exports = Router
