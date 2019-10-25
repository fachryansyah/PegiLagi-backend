const express = require("express")
const Router = express.Router()
const ArticlesController = require("../../app/Http/Controllers/ArticlesController")

const {multerUploads} = require("../../app/Http/Middleware/Multer")

Router.get("/promotion", ArticlesController.getPromotion)
Router.post("/prmotion/create", multerUploads, ArticlesController.createPromotion)

module.exports = Router
