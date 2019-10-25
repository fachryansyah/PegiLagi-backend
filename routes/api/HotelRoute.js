const express = require("express")
const Router = express.Router()
const HotelController = require("../../app/Http/Controllers/HotelController")

const {multerUploads} = require("../../app/Http/Middleware/Multer")

Router.get("/", HotelController.getHotel)
Router.post("/create", HotelController.createHotel)
Router.get("/d/:id", HotelController.getHotelDetail)
Router.post("/booking", HotelController.bookingHotel)
Router.post("/upload", multerUploads,HotelController.createImageHotel)

module.exports = Router
