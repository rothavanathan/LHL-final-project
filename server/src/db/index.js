// This file handles all our db interactions
const pg = require("pg");
require('dotenv').config();

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable` ;

const client = new pg.Client({
  connectionString: connectionString || process.env.DATABASE_URL,
});

client
  .connect()
  .then(console.log("Connected to db"))
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = client;

// This file must be adapted to suit our requirements