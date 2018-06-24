'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var report_violation_controller_1 = require("./report-violation.controller");
var router = express_1.Router();
router.post('/', report_violation_controller_1.default.reportViolation);
exports.default = router;
