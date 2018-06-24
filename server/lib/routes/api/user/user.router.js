'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("./user.controller");
var user_middleware_1 = require("./user.middleware");
var router = express_1.Router();
router
    .post('/', user_controller_1.default.createUser)
    .get('/', user_middleware_1.userAuth, user_controller_1.default.getUser)
    .put('/', user_middleware_1.userAuth, user_controller_1.default.updateUser)
    .post('/login', user_controller_1.default.login)
    .put('/login', user_middleware_1.userAuth, user_controller_1.default.updateUserPassword)
    .all('/logout', user_controller_1.default.logout);
exports.default = router;
