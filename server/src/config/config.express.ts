'use strict';

import * as express from 'express';
import* as path from 'path';

const configExpress = (app) => {
    app
    
}

export default configExpress;


// var express = require('express'),
//     mongoose = require('mongoose'),
//     path = require('path'),
//     helmet = require('helmet'),
//     fileUpload = require('express-fileupload'),
//     bodyParser = require('body-parser'),
//     cookieParser = require('cookie-parser'),
//     session = require('express-session'),
//     MongoStore = require('connect-mongo')(session),
//     config = require('./variables.express.js'),
//     logger = require('../lib/logger.js');

// module.exports = function(app) {
//     app
//         .use(helmet({
//            contentSecurityPolicy: {
//                directives: {
//                    defaultSrc: [
//                        "'self'"
//                    ],
//                    scriptSrc: [
//                        "'self'", 
//                        'https://*.braintreegateway.com', 
//                        'https://use.fontawesome.com', 
//                        'https://*.googleapis.com', 
//                        'https://*.paypal.com', 
//                        'https://*.paypalobjects.com', 
//                        "'sha256-SMBybfO28z3B8/FU3pdJgkMr46g+U7JkhdeYX3aOPmY='", 
//                        "'sha256-YC5mUPu6Ad6u0kuWzZNl6Sz5rSm65mBtq3YrJ8GtaC8='"
//                    ],
//                    imgSrc: [
//                        "'self'", 
//                        'blob:',
//                        'https://scontent.xx.fbcdn.net', 
//                        'https://www.w3schools.com', 
//                        'https://external.xx.fbcdn.net'
//                    ],
//                    frameSrc: [
//                        "'self'", 
//                        'https://fonts.googleapis.com', 
//                        'https://use.fontawesome.com', 
//                        'https://*.braintreegateway.com/', 
//                        'https://*.paypal.com'
//                    ],
//                    styleSrc: [
//                        "'self'", 
//                        'data:', 
//                        'https://*.braintreegateway.com', 
//                        'https://*.googleapis.com', 
//                        'https://use.fontawesome.com',
//                        "'unsafe-inline'",
//                    ],
//                    fontSrc: [
//                        "'self'", 
//                        'https://fonts.gstatic.com', 
//                        'https://use.fontawesome.com'
//                    ],
//                    connectSrc: [
//                        "'self'", 
//                        'https://*.braintreegateway.com', 
//                        'https://www.paypal.com'
//                    ],
//                    reportUri: '/report-violation',
//                    objectSrc: [
//                        "'none'"
//                    ],
//            //      pgradeInsecureRequests: true,
//                },
//                reportOnly: true,
//                setAllHeaders: true
//            }
//         ))
//         // .use(function(req, res, next) {
//         //     let url = req.headers.host.split('.');
//         //     if (url[url.length-1] != "com") {
//         //         res.status(401).end();
//         //     }
//         //     if (url[url.length-2] == 'pencil4life') {
//         //         next();
//         //     } else if (url[url.length-2] == 'bradashworth') {
//         //         // return next();
//         //         let newurl = url;
//         //         newurl[url.length-2] = 'pencil4life';
//         //         res.redirect('https://' + newurl.join('.') + req.url);
//         //     } else {
//         //         res.status(401).end();
//         //     }
//         // })
//         // .use(function(req, res, next) {
//         //     if (req.headers.host.split('.').length < 3) {
//         //         res.redirect('https://' + 'www.' + req.headers.host + req.url);
//         //     } else {
//         //         if (req.secure) {
//         //             next();
//         //         } else {
//         //             res.redirect('https://' + req.headers.host + req.url);
//         //         }
//         //     }
//         // })
//         .use(fileUpload())
//         .use(bodyParser.json())
//         .use(bodyParser.json({type: 'application/json'}))
//         .use(bodyParser.json({type: 'application/csp-report'}))
//         .use(bodyParser.urlencoded({ extended: false }))
//         .use(cookieParser())
//         .use(session({
//             secret: config.SESSION_SECRET,
//             store: new MongoStore({
//                 mongooseConnection: mongoose.connection,
//                 collection: config.SESSION_COLLECTION,
//             }),
//             resave: false,
//             saveUninitialized: true,
//             cookie: { 
//                 // secure: true,
//                 expires: new Date(Date.now() + 3600000*24*365),
//                 maxAge: 3600000*24*365
//             }
//         }))
//         .use('/images', express.static(path.join(__dirname, '../../src/images/')))
//         .use('/images/site', express.static(path.join(__dirname, '../../data/images/site/')))
//         .use('/', express.static(path.join(__dirname, '../../dist/')))
//         .use('/fonts', express.static(path.join(__dirname, '../../src/fonts/')))
// };