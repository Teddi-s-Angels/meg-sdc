const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const {Pool} = require('pg');

m
const pool = new Pool({
    connectionString: connectionString,
  })
  
  module.exports = {pool}