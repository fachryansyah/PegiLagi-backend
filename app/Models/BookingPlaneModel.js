const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class BookingPlaneModel extends Model {
    static get tableName() {
        return "booking_plane"
    }
}

module.exports = BookingPlaneModel