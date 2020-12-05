const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const {Pool} = require('pg');

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
    connectionString: connectionString,
  })
  
  module.exports = {pool}