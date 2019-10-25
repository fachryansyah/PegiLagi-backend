const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class ImageHotelModel extends Model {
  static get tableName() {
    return "image_hotel"
  }
}

module.exports = ImageHotelModel
