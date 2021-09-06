var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
var apiRouter = require("./routes/index");
dotenv.config();
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "/public/upload")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(apiRouter);

app.use(function (err, req, res, next) {
  return res.status(500).json(err);
});

module.exports = app;
