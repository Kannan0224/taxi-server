"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("./config/db");
var bookinglist_1 = require("./router/bookinglist");
var cors = require("cors");
var dotenv = require('dotenv');
dotenv.config();
var app = express();
app.use(express.json());
app.use(cors());
var db = db_1.connection;
db.connect();
app.use("/booking", bookinglist_1.bookingRouter);
app.listen(3001, function () {
    console.log("connected successfully");
});
