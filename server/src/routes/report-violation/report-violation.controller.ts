'use strict';

import { report } from '../../utilities/logger';

function ReportViolationController():void {};

// logs the violations.
ReportViolationController.prototype.reportViolation = function(req, res, next) {
    if (req.body) {
        report('CSP Violation: ');
        if ('csp-report' in req.body) {
            var cspReport = req.body['csp-report'];
            if ('blocked-uri' in cspReport) {
               report('Blocked URI: ' + cspReport['blocked-uri']); 
            }
            if ('document-uri' in cspReport) {
                report('document-uri: ' + cspReport['document-uri']);
            }    
            if ('effective-directive' in cspReport) {
                report('effective-directive: ' + cspReport['effective-directive']);
            }    
            if ('original-policy' in cspReport) {
                report('original-policy: ' + cspReport['original-policy']);
            }    
            if ('violated-directive' in cspReport) {
                report('violated-directive: ' + cspReport['violated-directive']);
            }    
        }
    } else {
        report('CSP Violation: No data received!');
    }
    res.status(200).send('Thanks for reporting');
}

export default ReportViolationController.prototype;