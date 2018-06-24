'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var main_controller_1 = require("./main.controller");
var helmet = require("helmet");
var router = express_1.Router();
router
    .use('/', helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [
                "'self'"
            ],
            scriptSrc: [
                "'self'",
                'https://*.braintreegateway.com',
                'https://use.fontawesome.com',
                'https://*.googleapis.com',
                'https://*.paypal.com',
                'https://*.paypalobjects.com',
                "'sha256-SMBybfO28z3B8/FU3pdJgkMr46g+U7JkhdeYX3aOPmY='",
                "'sha256-YC5mUPu6Ad6u0kuWzZNl6Sz5rSm65mBtq3YrJ8GtaC8='"
            ],
            imgSrc: [
                "'self'",
                'blob:',
                'https://scontent.xx.fbcdn.net',
                'https://www.w3schools.com',
                'https://external.xx.fbcdn.net'
            ],
            frameSrc: [
                "'self'",
                'https://fonts.googleapis.com',
                'https://use.fontawesome.com',
                'https://*.braintreegateway.com/',
                'https://*.paypal.com'
            ],
            styleSrc: [
                "'self'",
                'data:',
                'https://*.braintreegateway.com',
                'https://*.googleapis.com',
                'https://use.fontawesome.com',
                "'unsafe-inline'",
            ],
            fontSrc: [
                "'self'",
                'https://fonts.gstatic.com',
                'https://use.fontawesome.com'
            ],
            connectSrc: [
                "'self'",
                'https://*.braintreegateway.com',
                'https://www.paypal.com'
            ],
            reportUri: '/report-violation',
            objectSrc: [
                "'none'"
            ],
        },
        reportOnly: true,
        setAllHeaders: true
    }
}))
    .get('/', main_controller_1.default.getRoot);
exports.default = router;
