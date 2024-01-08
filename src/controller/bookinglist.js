"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driver = exports.complaints = exports.bookTaxi = exports.getAllBookingList = void 0;
var db_1 = require("../config/db");
var db = db_1.connection;
var getAllBookingList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        db.query("SELECT * from bookingList", function (err, row, feilds) {
            res.send(row);
        });
        return [2 /*return*/];
    });
}); };
exports.getAllBookingList = getAllBookingList;
var bookTaxi = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        data = req.body;
        db.query('INSERT INTO bookingList (cartype, package, username, bookFrom, bookTo, mobileNumber, bookingdate) VALUES (? ,?, ?, ?, ?, ?, ?)', [data.carType, data.userPackage, data.userName, data.fromUser, data.toUser, data.userMobile, data.userDate], function (err, results, fields) {
            if (err) {
                res.status(200).send({
                    message: "server Error",
                    status: 'failed',
                    bookingId: null
                });
                return;
            }
            var accountSid = 'ACba0f2e9de532e1b62a74e53c8d5fffa7';
            var authToken = 'f6a0bdfa378c2665036dca67971e6f17';
            var client = require('twilio')(accountSid, authToken);
            client.messages.create({
                body: "Booking conformed cutomername ".concat(data.userName, " & customerMobileNumber *").concat(data.userMobile, "*"),
                from: '+12019879395',
                to: '+919087477027'
            }).then(function () {
                res.status(200).send({
                    message: "booking conformed",
                    status: 'success',
                    bookingId: results.insertId
                });
            });
        });
        return [2 /*return*/];
    });
}); };
exports.bookTaxi = bookTaxi;
var complaints = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        data = req.body;
        db.query('INSERT INTO complaints (username ,usermail ,mobileNumber  ,subject , message ) VALUES (? ,?, ?, ?, ?)', [data.userName, data.eMail, data.number, data.subject, data.message], function (err, results, fields) {
            if (err) {
                res.status(200).send({
                    message: "server Error",
                    status: 'failed',
                    bookingId: null
                });
                return;
            }
            console.log("Inserted successfully:", results);
            res.status(200).send({
                message: "booking conformed",
                status: 'success',
            });
        });
        return [2 /*return*/];
    });
}); };
exports.complaints = complaints;
var driver = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        data = req.body;
        db.query('INSERT INTO driver (username ,mobileNumber ,location  ,vechileNumber , vechileType , message ) VALUES (? ,?, ?, ?, ?,?)', [data.userName, data.phoneNo, data.location, data.regNo, data.vechileType, data.message], function (err, results, fields) {
            if (err) {
                res.status(200).send({
                    message: "server Error",
                    status: 'failed',
                    bookingId: null
                });
                return;
            }
            console.log("Inserted successfully:", results);
            res.status(200).send({
                message: "registerd successfully",
                status: 'success',
            });
        });
        return [2 /*return*/];
    });
}); };
exports.driver = driver;
