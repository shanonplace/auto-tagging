var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/hooks");

var app = express();

app.use(logger("dev"));
app.use(
  express.json({
    type: ["application/json", "application/vnd.contentful.management.v1+json"],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/hooks", usersRouter);

module.exports = app;
