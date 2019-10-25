const { Model } = require("objection")
const knex = require("../../database/connection")

Model.knex(knex)

class ArticlesModel extends Model {
    static get tableName() {
        return "articles"
    }
}

module.exports = ArticlesModel