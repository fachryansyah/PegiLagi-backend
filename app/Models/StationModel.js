const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class StationModel extends Model {
    static get tableName() {
        return "stations"
    }
}

module.exports = StationModel