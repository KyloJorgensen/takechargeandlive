'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var app_1 = require("./app");
var variables_express_1 = require("./config/variables.express");
http.createServer(app_1.default).listen(variables_express_1.HTTP_PORT, function () {
    var _date = new Date();
    console.log(_date.toUTCString() + " | Listening on port: " + variables_express_1.HTTP_PORT);
});
