const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class HotelModel extends Model {
  static get tableName() {
    return "hotel"
  }
}

module.exports = HotelModel
