const Auth = require('../../Providers/Auth')

const UserController ={

getUser: async (req,res) => {

    const user = await Auth.user(req)

    if (!user) {
        return res.json({
            message: 'Api key not valid',
            status: 304
        })
    }

    res.json({
        message: 'OKE',
        status: 200,
        data: user,
        error: false
    })
 }
}
module.exports = UserController