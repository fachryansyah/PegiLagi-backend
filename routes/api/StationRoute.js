const express = require("express")
const Router = express.Router()
const StationController = require("../../app/Http/Controllers/StationController")

Router.get("/", StationController.getStation)

module.exports = Router
