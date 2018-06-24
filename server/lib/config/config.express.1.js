'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var configExpress = function (app) {
    app
        .use('/dist/', express.static(path.join(__dirname, '../../../dist/')))
        .use('/images', express.static(path.join(__dirname, '../../../assests/images/')))
        .use('/fonts', express.static(path.join(__dirname, '../../../assests/fonts/')));
};
exports.default = configExpress;
