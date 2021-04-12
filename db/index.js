const { Pool } = require("pg");
require("dotenv").config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL;

let config = {};

if (process.env.NODE_ENV === "production") {
  config = {
    ssl: { require: true, rejectUnauthorized: false },
  };

  config.user =
    process.env.NODE_ENV === "production"
      ? process.env.PGUSER
      : process.env.PGUSER_DEV;

  config.password =
    process.env.NODE_ENV === "production"
      ? process.env.PGPASSWORD
      : process.env.PGPASSWORD_DEV;

  config.host =
    process.env.NODE_ENV === "production"
      ? process.env.PGHOST
      : process.env.PGHOST_DEV;

  config.port =
    process.env.NODE_ENV === "production"
      ? process.env.PGPORT
      : process.env.PGPORT_DEV;

  config.database =
    process.env.NODE_ENV === "production"
      ? process.env.PGDATABASE
      : process.env.PGDATABASE_DEV;
}

console.log(config);

const pool = new Pool(config);

module.exports = {
  query: (text, params) => pool.query(text, params),
};

// const { Pool } = require("pg");
// const pool = new Pool();
// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };
