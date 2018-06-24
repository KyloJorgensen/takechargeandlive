'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var main_router_1 = require("../routes/main/main.router");
var api_router_1 = require("../routes/api/api.router");
var report_violation_router_1 = require("../routes/report-violation/report-violation.router");
exports.default = (function (app) {
    app.use('/', main_router_1.default)
        .use('/api', api_router_1.default)
        .post('/report-violation', report_violation_router_1.default);
});
