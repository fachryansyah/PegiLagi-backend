const Station = require("../../Models/StationModel")

const StationController = {
  /*
    Get data station based on query string
    @method GET
    @return Json
    */
  getStation: async (req, res) => {
    let search = req.query.search ? req.query.search : "" // get input search

    const station = await Station.query()
      .where("name", "LIKE", "%" + search + "%")
      .orderBy("name","asc")


    return res.json({
      message: "OKE",
      status: 200,
      data: station,
      error: false
    })
  }
}

module.exports = StationController
