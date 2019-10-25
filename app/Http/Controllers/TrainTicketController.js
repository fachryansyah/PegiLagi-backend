const TrainTicket = require('../../Models/TrainTicketModel')
const BookingTrainmodel = require('../../Models/BookingTrainmodel')
const HistoryModel = require('../../Models/HistoryModel')
const PassangerModel = require('../../Models/PassengerModel')
const { raw } = require("objection")
const Auth = require('../../Providers/Auth')
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
    },
    orderTrainTicket: async (req,res) =>{

        const user = await Auth.user(req)
        let trainTiketId = req.body.train_ticket_id // get train tiket id
        let passenger = req.body.passengers// get passanger
        
        if(!user){
            return res.json({
                message: 'Api key not valid'
            })
        }

        const orderTicket = await BookingTrainmodel
        .query()
        .insert({
            order_no:'123456',
            user_id: user.id,
            train_ticket_id: trainTiketId,
            status: 1

        })

        if(!orderTicket){
            return res.json({
                message: "Can't create order",
                status: 404,
                error: true
            })
        }

        const HistoryorderTicket = await HistoryModel
        .query()
        .insert({
            user_id: user.id,
            bookinable_id: orderTicket.id,
            bookinable_type: 'Train'
        })

        if(!HistoryorderTicket){
            return res.json({
                message: "Can't create order",
                status: 404,
                error: true
            })
        }

        passenger.forEach(async(obj) => {
            const Passanger = await PassangerModel
            .query()
            .insert({
                bookinable_id: orderTicket.id,
                bookinable_type: 'Train',
                name: obj.name,
                titel: obj.titel,
                identity: obj.identity,
                identity_no: obj.identity_no
            })
        });

        return res.json({
            message: "OKE",
            status: 200,
            data: HistoryorderTicket,
            error: false
        })
    },

    
    createTrainTicket: async (req,res) =>{

        const user = await Auth.user(req)
        let trainId = req.body.train_id // get train id
        let fromStationId = req.body.from_station_id// get from station
        let toStationId = req.body.to_station_id// get to station
        let trainClass = req.body.train_class// get train class
        let price = req.body.price// get price
        let departureTime = req.body.departure_time// get departure time
        let arrivedTime = req.body.arrived_time// get departure arrived time
        
        if(!user){
            return res.json({
                message: 'Api key not valid'
            })
        }

        const createTicket = await TrainTicket
        .query()
        .insert({
            train_id:trainId,
            from_station_id: fromStationId,
            to_station_id: toStationId,
            class: trainClass,
            price: price,
            departure_time: departureTime,
            arrived_time: arrivedTime

        })

        if(!createTicket){
            return res.json({
                message: "Can't create tiket",
                status: 404,
                error: true
            })
        }

        return res.json({
            message: "OKE",
            status: 200,
            data: createTicket,
            error: false
        })
    }
}

module.exports = TrainTicketController