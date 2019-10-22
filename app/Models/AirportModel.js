const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class AirportModel extends Model {
    static get tableName() {
        return "airports"
    }
}

module.exports = AirportModel