const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class BookingHotelModel extends Model {
    static get tableName() {
        return "booking_hotel"
    }
}

module.exports = BookingHotelModel