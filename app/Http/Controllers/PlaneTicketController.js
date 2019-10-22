const PlaneTicket = require('../../Models/PlaneTicketModel')

const PlaneTicketController = {
    searchPlaneTicket: async (req, res) => {
        let pageIndex = req.query.page ? req.query.page - 1 : 0 // get page index for validation
        let limit = req.query.limit ? req.query.limit : 6 // set limit data
        let from = req.query.from ? req.query.from : "" // get input from
        let to = req.query.to ? req.query.to : "" // get input to
        let date = req.query.date ? req.query.date : "" // get input date
        let sort = req.query.sort ? req.query.sort : "id" // set sort data
        let sortMode = req.query.mode ? req.query.mode : "desc" // set sort mode with default desc

        const PlaneTickets = await PlaneTicket.query()
            .eager('[plane, fromAirport, toAirport ]')
            .where('from_airport_id', from)
            .where('to_airport_id', to)
            .where('departure_time', "like", '%' + date + '%')
            .orderBy(sort, sortMode)
            .page(pageIndex, limit)

        return res.json({
            message: "OKE",
            status: 200,
            data: PlaneTickets,
            error: false
        })
    }
}

module.exports = PlaneTicketController