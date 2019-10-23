const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class HistoryModel extends Model {
    static get tableName() {
        return "history"
    }
}

module.exports = HistoryModel