const express = require("express")
const Router = express.Router()
const TrainController = require("../../app/Http/Controllers/TrainController")

Router
    .get("/", TrainController.getTrain)

module.exports = Router