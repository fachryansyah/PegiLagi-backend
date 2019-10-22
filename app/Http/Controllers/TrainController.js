const Train = require('../../Models/TrainModel')

const TrainController = {
    /*
    Get data train based on query string
    @method GET
    @param req.query : pageIndex, limit
    @return Json
    */
    getTrain: async (req, res) => {

        let pageIndex = req.query.page ? req.query.page - 1 : 0 // get page index for validation
        let limit = req.query.limit ? req.query.limit : 8 // set limit data
        let search = req.query.search ? req.query.search : "" // get input search

        const trains = await Train.query()
            .where("trains.name", "LIKE", "%" + search + "%")
            .page(pageIndex, limit)

        let totalProduct = await Train.query().resultSize()

        if (search.length > 1) {
            totalProduct = trains.results.length
        }

        const totalPage = Math.round(totalProduct / limit)
        const currentPage = req.query.page ? parseInt(req.query.page) : 1

        // trains = trains.toJSON()
        trains.totalPage = totalPage
        trains.currentPage = currentPage

        return res.json({
            message: "OKE",
            status: 200,
            data: trains,
            error: false
        })
    }
}

module.exports = TrainController