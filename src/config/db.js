"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var mysql = require('mysql');
exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kannan@123',
    database: 'bookingtaxi'
});
