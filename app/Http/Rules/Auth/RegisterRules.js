const { body } = require("express-validator")
const User = require("../../../Models/UserModel")

const RegisterRules = [
    body("email", "field Email can't be null").exists(),
    body("email", "field Email maximal 60 character").isLength({ max: 60 }),
    body("email", "field Email minimum 6 character").isLength({ min: 6 }),
    body("email", "field Email your email invaid").isEmail(),
    body("email").custom(async (value) => {
        const user = await User.query().findOne({
            email: value
        })

        console.log(user)
        // check if email is in use
        if (user instanceof User) {
            console.log("email sudah dipakai")
            throw new Error('Email already in use');
        } else {
            console.log("email belum dipakai")
            return true
        }

    }),

    body("fullname", "field Fullname can't be null").exists(),
    body("fullname", "field Fullname maximal 60 character").isLength({ max: 60 }),
    body("fullname", "field Fullname minimum 6 character").isLength({ min: 2 }),

    body("password", "field Password can't be null").exists(),
    body("password", "field Password maximal 60 character").isLength({ max: 60 }),
    body("password", "field Password minimum 6 character").isLength({ min: 6 })
]

module.exports = RegisterRules;