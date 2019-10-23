const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class PassengerModel extends Model {
    static get tableName() {
        return "passenger"
    }
}

module.exports = PassengerModel