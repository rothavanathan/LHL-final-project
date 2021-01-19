let dbParams = {};
//  DATABASE_URL id a combination of the the dbparams details
//  Either way of connecting is viable
//  If deploying with heroku, they use db_url - can be taken apart to form db params object
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

module.exports = dbParams;