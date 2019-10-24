const Hotel = require("../../Models/HotelModel")
const BookingHotelModel = require("../../Models/BookingHotelModel")
const HistoryModel = require('../../Models/HistoryModel')
const GuestModel = require('../../Models/GuestModel')
const { raw } = require("objection")
const Auth = require('../../Providers/Auth')

const HotelController = {
  /*
    Get data hotel based on query string
    @method GET
    @param req.query : pageIndex, limit
    @return Json
    */
  getHotel: async (req, res) => {
    let pageIndex = req.query.page ? req.query.page - 1 : 0 // get page index for validation
    let limit = req.query.limit ? req.query.limit : 8 // set limit data
    let search = req.query.search ? req.query.search : "" // get input search

    const hotel = await Hotel.query()
      .where("name", "LIKE", "%" + search + "%")
      .orWhere("city", "LIKE", "%" + search + "%")
      .page(pageIndex, limit)

    let totalProduct = await Hotel.query().resultSize()

    if (search.length > 1) {
      totalProduct = hotel.results.length
    }

    const totalPage = Math.round(totalProduct / limit)
    const currentPage = req.query.page ? parseInt(req.query.page) : 1

    // hotel = hotel.toJSON()
    hotel.totalPage = totalPage
    hotel.currentPage = currentPage

    return res.json({
      message: "OKE",
      status: 200,
      data: hotel,
      error: false
    })
  },
  getHotelDetail: async (req, res) => {

    const hoteldetail = await Hotel.query()
      .findById(req.params.id)


    if (hoteldetail instanceof Hotel == false) {
      return res.json({
        message: "HOTEL NOT FOUND",
        status: 404,
        error: true
      })
    }

    return res.json({
      message: "OKE",
      status: 200,
      data: hoteldetail,
      error: false
    })
  },

  bookingHotel: async (req,res) =>{

    const user = await Auth.user(req)
    let hotelId = req.body.hotel_id // get hotel_id
    let guest = req.body.guests// get guests
    
    if(!user){
        return res.json({
            message: 'Api key not valid'
        })
    }

    const bookingHotel = await BookingHotelModel
    .query()
    .insert({
        order_no:'123456',
        user_id: user.id,
        hotel_id: hotelId,
        status: 1

    })

    if(!bookingHotel){
        return res.json({
            message: "Can't create order",
            status: 404,
            error: true
        })
    }

    const HistorybookingHotel = await HistoryModel
    .query()
    .insert({
        user_id: user.id,
        bookinable_id: bookingHotel.id,
        bookinable_type: 'Hotel'
    })

    if(!HistorybookingHotel){
        return res.json({
            message: "Can't create order",
            status: 404,
            error: true
        })
    }

    guest.forEach(async(obj) => {
        const Guest = await GuestModel
        .query()
        .insert({
            bookinable_id: bookingHotel.id,
            bookinable_type: 'Hotel',
            name: obj.name,
            titel: obj.titel,
            identity: obj.identity,
            identity_no: obj.identity_no
        })
    });

    return res.json({
        message: "OKE",
        status: 200,
        data: HistorybookingHotel,
        error: false
    })
}

}

module.exports = HotelController
