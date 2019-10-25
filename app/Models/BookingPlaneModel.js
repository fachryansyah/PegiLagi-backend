const { Model } = require("objection")
const knex = require("../../database/connection")
const PlaneTicket = require("./PlaneTicketModel")

Model.knex(knex)

class BookingPlaneModel extends Model {
    static get tableName() {
        return "booking_plane"
    }
    static get relationMappings(){
        return {
            planeTicket: {
                relation: Model.BelongsToOneRelation,
                modelClass: PlaneTicket,
                join: {
                    from: 'booking_plane.plane_ticket_id',
                    to: 'plane_tickets.id'
                }
            },
        }
    }
}

module.exports = BookingPlaneModel