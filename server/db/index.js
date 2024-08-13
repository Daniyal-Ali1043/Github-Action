const pg = require('pg');

const { Pool } = pg;

const pool = new Pool();

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool: pool  
};
