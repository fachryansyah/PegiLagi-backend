const express = require("express")
const Router = express.Router()
const SampleController = require("../../app/Http/Controllers/SampleController")

const {multerUploads} = require("../../app/Http/Middleware/Multer")

Router
    .get("/test", SampleController.test)
    .post("/test", multerUploads, SampleController.testUpload)

module.exports = Router