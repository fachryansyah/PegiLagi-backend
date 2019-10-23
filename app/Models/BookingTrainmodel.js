const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class BookingTrainmodel extends Model {
    static get tableName() {
        return "booking_train"
    }
}

module.exports = BookingTrainmodel