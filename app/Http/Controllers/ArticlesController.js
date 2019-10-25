const ArticlesModel = require('../../Models/ArticlesModel')
const Image = require('../../Providers/Image')
const { raw } = require("objection")
const Auth = require('../../Providers/Auth')
const Notification = require('../../Providers/Notification')

const ArticlesController = {
    /*
    Get data Prmotion based on query string
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
    Get data Travel Tips based on query string
    @method GET Travel Tips
    @return Json
    */
    
   getTravelTips: async (req, res) => {

    const traveltips = await ArticlesModel.query()
      .where("category","!=" ,"Promotion")

    return res.json({
      message: "OKE",
      status: 200,
      data: traveltips,
      error: false
    })
  },

  /*
    Create data Promotion based on query string
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
    },

    /*
    Create data Travel Tips based on query string
    @method POST Travel Tips
    @param req.query : title, url,category
    @return Json
    */
    
   createTravelTips: async (req,res) =>{
    const user = await Auth.user(req)
    let titleTravelTips = req.body.title // get titel travel tips
    let urlTravelTips  = req.body.url// get url prmotion
    let categoryTravelTips  = req.body.category// get category travel tips
    const image = await Image.upload(req) //get image upload

    if(!user){
        return res.json({
            message: 'Api key not valid'
        })
    }

    const addTravelTips = await ArticlesModel
    .query()
    .insert({
        title:titleTravelTips,
        url: urlTravelTips,
        image: image.url,
        category: categoryTravelTips

    })

    if(!addTravelTips){
        return res.json({
            message: "Can't create travel tips",
            status: 404,
            error: true
        })
    }

    Notification.push(titleTravelTips)

    return res.json({
        message: "OKE",
        status: 200,
        data: addTravelTips,
        error: false
    })
}
}

module.exports = ArticlesController