const { body } = require("express-validator")

const ResetPasswordRules = [

    body("new_password", "field Password can't be null").exists(),
    body("new_password", "field Password maximal 60 character").isLength({ max: 60 }),
    body("confirm_password", "field Password can't be null").exists(),
    body("confirm_password", "field Password maximal 60 character").isLength({ max: 60 }),
]

module.exports = ResetPasswordRules