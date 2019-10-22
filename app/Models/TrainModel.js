const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class TrainModel extends Model {
    static get tableName() {
        return "trains"
    }
}

module.exports = TrainModel