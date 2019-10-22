const { Model } = require("objection")
const knex = require("../../database/connection")
const plane = require("./PlanesModel")
const Airport = require("./AirportModel")

Model.knex(knex)

class PlaneTicketModel extends Model {
    static get tableName() {
        return "plane_tickets"
    }
    static get relationMappings(){
        return {
            plane: {
                relation: Model.BelongsToOneRelation,
                modelClass: plane,
                join: {
                    from: 'plane_tickets.plane_id',
                    to: 'planes.id'
                }
            },
            fromAirport: {
                relation: Model.BelongsToOneRelation,
                modelClass: Airport,
                join: {
                    from: 'plane_tickets.from_airport_id',
                    to: 'airports.id'
                }
            },
            toAirport: {
                relation: Model.BelongsToOneRelation,
                modelClass: Airport,
                join: {
                    from: 'plane_tickets.to_airport_id',
                    to: 'airports.id'
                }
            }
        }
    }
}

module.exports = PlaneTicketModel