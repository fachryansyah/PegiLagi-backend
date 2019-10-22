const { body } = require("express-validator")

const LoginRules = [
    body("email", "field Email can't be null").exists(),
    body("email", "email not valid").isEmail(),
    body("password", "field Password can't be null").exists(),
]

module.exports = LoginRules