'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var variables_express_1 = require("./variables.express");
var db = mongoose_1.connection;
db.on('connecting', function () {
    console.log('connecting');
});
db.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose_1.disconnect();
});
db.on('connected', function () {
    console.log('connected!');
});
db.once('open', function () {
    console.log('connection open');
});
db.on('reconnected', function () {
    console.log('reconnected');
});
db.on('disconnected', function () {
    console.log('disconnected');
    console.log('MONGODB_URL is: ' + variables_express_1.MONGODB_URL);
    mongoose_1.connect(variables_express_1.MONGODB_URL, {
        autoReconnect: true,
        connectTimeoutMS: 500,
        reconnectTries: Number.MAX_VALUE,
    });
});
mongoose_1.connect(variables_express_1.MONGODB_URL, { autoReconnect: true });
