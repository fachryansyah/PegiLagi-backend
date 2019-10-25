const ArticlesModel = require('../../Models/ArticlesModel')
const Image = require('../../Providers/Image')
const { raw } = require("objection")
const Auth = require('../../Providers/Auth')
const Notification = require('../../Providers/Notification')

const ArticlesController = {
    /*
    Get data Articles based on query string
    @method GET Promotion
    @return Json
    */
    
   getPromotion: async (req, res) => {

    const prmotion = await ArticlesModel.query()
      .where("category", "Promotion")

    return res.json({
      message: "OKE",
      status: 200,
      data: prmotion,
      error: false
    })
  },

  /*
    Get data Articles based on query string
    @method POST Promotion
    @param req.query : title, url
    @return Json
    */
    
    createPromotion: async (req,res) =>{
        const user = await Auth.user(req)
        let titlePromotion = req.body.title // get titel promotion
        let urlPromotion  = req.body.url// get url prmotion
        const image = await Image.upload(req) //get image upload

        if(!user){
            return res.json({
                message: 'Api key not valid'
            })
        }

        const addPromotion = await ArticlesModel
        .query()
        .insert({
            title:titlePromotion,
            url: urlPromotion,
            image: image.url,
            category: 'Promotion'

        })

        if(!addPromotion){
            return res.json({
                message: "Can't create prmotion",
                status: 404,
                error: true
            })
        }

        Notification.push(titlePromotion)

        return res.json({
            message: "OKE",
            status: 200,
            data: addPromotion,
            error: false
        })
    }
}

module.exports = ArticlesController