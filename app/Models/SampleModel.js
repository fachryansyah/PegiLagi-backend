const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class SampleModel extends Model {
    static get tableName() {
        return "planes"
    }
}

module.exports = SampleModel