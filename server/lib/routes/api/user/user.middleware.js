'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = require("./user.model");
var badAuthentication = function (next) {
    var error = new Error('Bad Authentication');
    error.name = 'AuthenticationError';
    next(error);
};
// next if userId is vaild.
exports.userAuth = function (req, res, next) {
    if (req.session._userId) {
        return next();
    }
    badAuthentication(next);
};
// next if adminIs is vaild.
exports.adminAuth = function (req, res, next) {
    if (req.session._adminId && req.session._adminId == req.session._userId) {
        var query = user_model_1.default.findOne({ _id: req.session._userId });
        return query.then(function (user) {
            if (user.admin && !user.discontinued) {
                return next();
            }
            badAuthentication(next);
        }).catch(function (error) {
            next(error);
        });
    }
    badAuthentication(next);
};
exports.default = {
    userAuth: exports.userAuth,
    adminAuth: exports.adminAuth,
};
