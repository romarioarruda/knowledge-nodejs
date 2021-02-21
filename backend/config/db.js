const config = require('../knexfile')
const knex = require('knex')(config)

knex.migrate.latest([config])

// knex.migrate.rollback([config])
module.exports = knex