const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class FacilityModel extends Model {
    static get tableName() {
        return "facilities"
    }
}

module.exports = FacilityModel