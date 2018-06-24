'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var log_to_file_1 = require("log-to-file");
var path = require("path");
exports.log = function (message) {
    log_to_file_1.default(message, path.join(__dirname, '../../../logs/pencil4life.log'));
    console.log(message);
};
exports.report = function (message) {
    log_to_file_1.default(message, path.join(__dirname, '../../../logs/report-violation.log'));
    console.log(message);
};
exports.default = {
    log: exports.log,
    report: exports.report,
};
