// db connection
const { Pool } = require('pg');

const pool = new Pool({
  user: 'braden',
  host: 'localhost',
  database: 'music_api',
  password: 'braden',
  port: 5432,
});

module.exports = pool;
