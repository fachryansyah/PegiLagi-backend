const express = require("express")
const Router = express.Router()
const ArticlesController = require("../../app/Http/Controllers/ArticlesController")

const {multerUploads} = require("../../app/Http/Middleware/Multer")

Router.post("/create", multerUploads, ArticlesController.createPromotion)

module.exports = Router
