const { validationResult } = require("express-validator")
const Auth = require("../../Providers/Auth")

const AuthController = {
    /*
    Register user
    @param req.body : fullname, email, password
    @return Json
    */
    register: async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({
                message: "Validation error",
                status: 304,
                data: {},
                errors: errors.array()
            })
        }

        // try to register new user
        const register = await Auth.register(req)

        // check if when register user has error
        if (!register) {
            return res.json({
                message: "Can't register this user",
                status: 500,
                data: {},
                errors: true
            })
        }

        return res.json({
            message: "OKE",
            status: 200,
            data: {},
            errors: false
        })
    }
}

module.exports = AuthController