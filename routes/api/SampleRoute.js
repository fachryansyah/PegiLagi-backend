const express = require("express")
const Router = express.Router()
const SampleController = require("../../app/Http/Controllers/SampleController")


Router
    .get("/test", SampleController.test)

module.exports = Router;