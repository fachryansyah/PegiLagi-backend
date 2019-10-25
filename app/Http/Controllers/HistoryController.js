const HistoryModel = require("../../Models/HistoryModel")
const BookingPlane = require("../../Models/BookingPlaneModel")
const { raw } = require("objection")
const Auth = require('../../Providers/Auth')

const HistoryController = {
  /*
    Get data history based on query string
    @method GET
    @param req.query : pageIndex, limit
    @return Json
    */
  getHistory: async (req, res) => {

    const user = await Auth.user(req)

    const histories = await HistoryModel.query()
    .where("user_id", user.id)

    let data = []

    await HistoryController.asyncForEach(histories, async (val, key) => {
      let history = val.toJSON()
      let bookingPlane
      if (history.bookinable_type == "Plane") {
        bookingPlane = await BookingPlane.query()
        .where("user_id", history.user_id)
        .where("id", history.bookinable_id)
        .eager("[planeTicket.*]")
      }
      data.push(bookingPlane[0])
    })

    if (!histories) {
      return res.json({
        message: "HISTORY NOT FOUND",
        status: 404,
        error: true
      })
    }

    return res.json({
      message: "OKE",
      status: 200,
      data: data,
      error: false
    })
  },
  asyncForEach: async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  
}

module.exports = HistoryController
