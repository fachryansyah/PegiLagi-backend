const Airport = require("../../Models/AirportModel")

const AirportController = {
  /*
    Get data airport based on query string
    @method GET
    @return Json
    */
  getAirport: async (req, res) => {
    let search = req.query.search ? req.query.search : "" // get input search

    const airport = await Airport.query()
      .where("name", "LIKE", "%" + search + "%")
      .orderBy("name","asc")


    return res.json({
      message: "OKE",
      status: 200,
      data: airport,
      error: false
    })
  }
}

module.exports = AirportController
