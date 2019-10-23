const HistoryModel = require("../../Models/HistoryModel")
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

    const history = await HistoryModel.query()
      .findOne({
          user_id: user.id
      })


    if (history instanceof HistoryModel == false) {
      return res.json({
        message: "HISTORY NOT FOUND",
        status: 404,
        error: true
      })
    }

    return res.json({
      message: "OKE",
      status: 200,
      data: history,
      error: false
    })
  },
  
}

module.exports = HistoryController
