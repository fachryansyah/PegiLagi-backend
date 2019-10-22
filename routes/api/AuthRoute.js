const express = require("express")
const Router = express.Router()
const AuthController = require("../../app/Http/Controllers/AuthController")

// rules validator
const LoginRules = require("../../app/Http/Rules/Auth/LoginRules")
const RegisterRules = require("../../app/Http/Rules/Auth/RegisterRules")

Router
    .post("/login", LoginRules, AuthController.login)
    .post("/register", RegisterRules, AuthController.register)

module.exports = Router