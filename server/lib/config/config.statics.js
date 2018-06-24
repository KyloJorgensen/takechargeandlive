'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path = require("path");
var configExpress = function (app) {
    app
        .use('/dist/', express_1.static(path.join(__dirname, '../../../dist/')))
        .use('/images', express_1.static(path.join(__dirname, '../../../assests/images/')))
        .use('/fonts', express_1.static(path.join(__dirname, '../../../assests/fonts/')));
};
exports.default = configExpress;
