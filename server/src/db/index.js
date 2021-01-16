// This file handles all our db interactions
const pg = require("pg");

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL || ""
});

client
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = client;

// This file must be adapted to suit our requirements