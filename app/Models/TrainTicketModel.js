const { Model } = require("objection")
const knex = require("../../database/connection")
const Train = require("./TrainModel")
const Station = require("./StationModel")

Model.knex(knex)

class TrainModel extends Model {
    static get tableName() {
        return "train_tickets"
    }

    static get relationMappings() {
        return {
            train: {
                relation: Model.BelongsToOneRelation,
                modelClass: Train,
                join: {
                    from: 'train_tickets.train_id',
                    to: 'trains.id'
                }
            },
            fromStation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Station,
                join: {
                    from: 'train_tickets.from_station_id',
                    to: 'stations.id'
                }
            },
            toStation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Station,
                join: {
                    from: 'train_tickets.to_station_id',
                    to: 'stations.id'
                }
            }
        }
    }
}

module.exports = TrainModel