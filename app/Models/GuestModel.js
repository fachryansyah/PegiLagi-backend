const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class GuestModel extends Model {
    static get tableName() {
        return "guest"
    }
}

module.exports = GuestModel