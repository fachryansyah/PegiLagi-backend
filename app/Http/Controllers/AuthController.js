const { validationResult } = require("express-validator")
const Auth = require("../../Providers/Auth")
const bcrypt = require("bcrypt")
const UserModel = require("../../Models/UserModel")

const AuthController = {
    /*
   Authenticated user based on Email and Password
   @param req.body : Email, password
   @return Json
   */
    login: async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({
                message: "Validation error",
                status: 304,
                data: {},
                errors: errors.array()
            })
        }

        // set the credential for authentication
        const credential = {
            email: req.body.email,
            password: req.body.password
        }

        // try to validate email, and password
        const isLoggedIn = await Auth.attempt(credential)

        // check if error when  validate email, and password
        if (isLoggedIn.error) {
            return res.json({
                message: isLoggedIn.message,
                status: 500,
                data: {},
                errors: true
            })
        }

        // return res.json({isLoggedIn})
        return res.json({
            message: "OKE logged in",
            status: 200,
            data: isLoggedIn,
            errors: false
        })
    },
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
    },
    /*
    Register user
    @param req.body : current password, new password, confirm password
    @return Json
    */
   resetPassword: async (req, res) => {

    const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({
                message: "Validation error",
                status: 304,
                data: {},
                errors: errors.array()
            })
        }

    const user = await Auth.user(req)
    let currentPassword = req.body.current_password
    let newPassword = req.body.new_password
    let confirmPassword = req.body.confirm_password

    if(!user){
        return res.json({
            message: 'Api key not valid'
        })
    }

    const userId = await UserModel.query()
      .findById(user.id)


    if (userId instanceof UserModel == false) {
      return res.json({
        message: "USER NOT FOUND",
        status: 404,
        error: true
      })
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, userId.password)

    if (!isPasswordMatch) {
        return res.json({
            message: "Wrong password",
            error: true
        })    
    }

    if (newPassword != confirmPassword) {
        return res.json({
            message: "Confirm passwords do not match",
            error: true
        })
    }

    const hashPassword = await bcrypt.hash(newPassword, 14)

    const passwordUpdated = await UserModel.query()
    .findById(userId.id)
    .patch({
    password: hashPassword
    })

    return res.json({
        message: "OKE",
        status: 200,
        data: userId,
        newPassword: passwordUpdated,
        confirmPassword: confirmPassword,
        errors: false
    })
}
}

module.exports = AuthController