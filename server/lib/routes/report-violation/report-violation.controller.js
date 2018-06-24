'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../../utilities/logger");
function ReportViolationController() { }
;
// logs the violations.
ReportViolationController.prototype.reportViolation = function (req, res, next) {
    if (req.body) {
        logger_1.report('CSP Violation: ');
        if ('csp-report' in req.body) {
            var cspReport = req.body['csp-report'];
            if ('blocked-uri' in cspReport) {
                logger_1.report('Blocked URI: ' + cspReport['blocked-uri']);
            }
            if ('document-uri' in cspReport) {
                logger_1.report('document-uri: ' + cspReport['document-uri']);
            }
            if ('effective-directive' in cspReport) {
                logger_1.report('effective-directive: ' + cspReport['effective-directive']);
            }
            if ('original-policy' in cspReport) {
                logger_1.report('original-policy: ' + cspReport['original-policy']);
            }
            if ('violated-directive' in cspReport) {
                logger_1.report('violated-directive: ' + cspReport['violated-directive']);
            }
        }
    }
    else {
        logger_1.report('CSP Violation: No data received!');
    }
    res.status(200).send('Thanks for reporting');
};
exports.default = ReportViolationController.prototype;
