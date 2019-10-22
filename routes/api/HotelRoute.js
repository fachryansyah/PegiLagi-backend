const express = require("express")
const Router = express.Router()
const HotelController = require("../../app/Http/Controllers/HotelController")

Router.get("/", HotelController.getHotel)

module.exports = Router
