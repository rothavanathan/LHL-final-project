const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const stemsRouter = require("./routes/stems");
// const usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
// was originally false
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/stems", stemsRouter);
// app.use("/api/users", usersRouter);

module.exports = app;
