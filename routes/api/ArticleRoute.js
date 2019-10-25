const express = require("express")
const Router = express.Router()
const ArticlesController = require("../../app/Http/Controllers/ArticlesController")

const {multerUploads} = require("../../app/Http/Middleware/Multer")

Router.get("/promotion", ArticlesController.getPromotion)
Router.get("/traveltips", ArticlesController.getTravelTips)
Router.post("/prmotion/create", multerUploads, ArticlesController.createPromotion)
Router.post("/traveltips/create", multerUploads, ArticlesController.createTravelTips)

module.exports = Router
