const { Pool } = require("pg");
require("dotenv").config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL;

let connectionString =
  process.env.NODE_ENV === "production" ? proConfig : devConfig;

console.log("DBURL:", connectionString);

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

// const { Pool } = require("pg");
// const pool = new Pool();
// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };
