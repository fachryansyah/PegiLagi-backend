const { body } = require("express-validator")
const User = require("../../../Models/User")

const SampleRules = [
    body("firstname", "field Firstname can't be null").exists(),
    body("firstname", "field Firstname maximal 60 character").isLength({max:60}),
    body("firstname", "field Firstname minimum 6 character").isLength({min:6})
]

module.exports = SampleRules;