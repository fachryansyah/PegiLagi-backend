const PlaneTicket = require('../../Models/PlaneTicketModel')
const BookingPlanemodel = require('../../Models/BookingPlaneModel')
const HistoryModel = require('../../Models/HistoryModel')
const PassangerModel = require('../../Models/PassengerModel')
const { raw } = require("objection")
const Auth = require('../../Providers/Auth')

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
    },
    orderPlaneTicket: async (req,res) =>{

        const user = await Auth.user(req)
        let planeTiketId = req.body.plane_ticket_id // get train tiket id
        let passenger = req.body.passengers// get passanger
        
        if(!user){
            return res.json({
                message: 'Api key not valid'
            })
        }

        const orderTicket = await BookingPlanemodel
        .query()
        .insert({
            order_no:'123456',
            user_id: user.id,
            plane_ticket_id: planeTiketId,
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
            bookinable_type: 'Plane'
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
                bookinable_type: 'Plane',
                name: obj.name,
                titel: obj.titel,
                identity: obj.identity,
                identity_no: obj.identity_no
            })
        });


        return res.json({
            message: "OKE",
            status: 200,
            data: orderTicket,
            error: false
        })
    },

    createPlaneTicket: async (req,res) =>{

        const user = await Auth.user(req)
        let planeId = req.body.plane_id // get plane id
        let fromAirportId = req.body.from_airport_id// get from airport
        let toAirportId = req.body.to_airport_id// get to airport
        let baggage = req.body.baggage// get plane baggage
        let price = req.body.price// get price
        let departureTime = req.body.departure_time// get departure time
        let arrivedTime = req.body.arrived_time// get departure arrived time
        
        if(!user){
            return res.json({
                message: 'Api key not valid'
            })
        }

        const createTicket = await PlaneTicket
        .query()
        .insert({
            plane_id:planeId,
            from_airport_id: fromAirportId,
            to_airport_id: toAirportId,
            baggage: baggage,
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

module.exports = PlaneTicketController