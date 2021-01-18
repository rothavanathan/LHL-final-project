const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cookieSession = require("cookie-session");
// const db = require("../db")

// const dbHelpers = require('./helpers/dbHelpers')(db);

const stemsRouter = require("./routes/stems");
const usersRouter = require("./routes/users");
// Will need all relevant routes setup here

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

// PG database client/connection setup
const { Pool } = require("pg");
// const dbParams = require("../lib/db.js");
const db = new Pool({
  host: "localhost",
  port: 5432,
  user: "labber",
  password: "labber",
  database: "stem",
});
db.connect();
// const db = new Pool(dbParams);

// Prior issues with below env details, needs to be resolved

// DB_HOST = localhost
// DB_USER = labber
// DB_PASS = labber
// DB_NAME = stem
// DB_PORT = 5432

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
// was originally false below
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/stems", stemsRouter(db));
app.use("/api/users", usersRouter(db));
// Other relevant api routes will come here

module.exports = app;
