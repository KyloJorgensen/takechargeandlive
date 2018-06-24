'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_1 = require("cookie");
exports.default = (function (router) {
    router.use(function (error, req, res, next) {
        if (error) {
            next(error);
        }
        else {
            res.status(500).json('missing error');
        }
    });
    router.use(function (error, req, res, next) {
        if (res.headerSent) {
            return next(error);
        }
        if (error.name == 'AuthenticationError') {
            if ('user' in error) {
                if (!error.user) {
                    return res.status(444).json(error.message);
                }
            }
            return res.status(401).json(error.message);
        }
        if (error.name == 'MongoError') {
            if (error.code == 11000) {
                return res.status(400).json(error.message);
            }
        }
        if (error.name == 'LoginError') {
            res.setHeader('Set-Cookie', cookie_1.serialize('UserKey', null, {
                httpOnly: false,
                maxAge: 60 * 60 * 24 * 7 // 1 week 
            }));
            return res.status(401).end();
        }
        if (error.name == 'ValidationError') {
            console.log(error.errors);
            return res.status(240).json(error);
        }
        res.status(500);
        console.log(error);
        if (error) {
            return res.json(error);
        }
        else {
            return res.json('missing message');
        }
        next(error);
    });
    router.use(function (error, req, res, next) {
        console.log('CRITICAL ERROR: ', error);
    });
});
