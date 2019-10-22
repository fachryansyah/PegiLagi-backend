const Hotel = require("../../Models/HotelModel")

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
  }
}

module.exports = HotelController
