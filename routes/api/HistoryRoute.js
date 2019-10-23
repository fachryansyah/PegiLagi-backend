const express = require("express")
const Router = express.Router()
const HistoryController = require("../../app/Http/Controllers/HistoryController")

Router.get("/", HistoryController.getHistory)

module.exports = Router
