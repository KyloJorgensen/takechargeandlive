'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var checkout_controller_1 = require("./checkout.controller");
var router = express_1.Router();
router.get('/', checkout_controller_1.default.redirect)
    .get('/new', checkout_controller_1.default.new)
    .get('/:id', checkout_controller_1.default.transaction)
    .post('/', checkout_controller_1.default.sale);
exports.default = router;
