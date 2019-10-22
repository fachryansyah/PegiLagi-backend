const TrainTicket = require('../../Models/TrainTicketModel')
const { raw } = require("objection")

const TrainTicketController = {
    /*
    Get data trainTicket based on query string
    @method GET
    @param req.query : pageIndex, limit, search, sort, mode
    @return Json
    */
    getTrainTicket: async (req, res) => {

        let pageIndex = req.query.page ? req.query.page - 1 : 0 // get page index for validation
        let limit = req.query.limit ? req.query.limit : 8 // set limit data
        let from = req.query.from ? req.query.from : "" // get input from
        let to = req.query.to ? req.query.to : "" // get input to
        let date = req.query.date ? req.query.date : "" // get input date
        let sort = req.query.sort ? req.query.sort : "price" // get input sort
        let sortMode = req.query.mode ? req.query.mode : "desc" // set sort mode with default desc

        const trainTickets = await TrainTicket.query()
            .eager("[train, fromStation,toStation]")
            .where("from_station_id", from)
            .where("to_station_id", to)
            .where("departure_time", "LIKE", "%" + date + "%")
            .orderBy(sort, sortMode)
            .page(pageIndex, limit)

        let totalTrainTicket = await TrainTicket.query().resultSize()

        const totalPage = Math.round(totalTrainTicket / limit)
        const currentPage = req.query.page ? parseInt(req.query.page) : 1

        // trainTickets = trainTickets.toJSON()
        trainTickets.totalPage = totalPage
        trainTickets.currentPage = currentPage

        return res.json({
            message: "OKE",
            status: 200,
            data: trainTickets,
            error: false
        })
    }
}

module.exports = TrainTicketController