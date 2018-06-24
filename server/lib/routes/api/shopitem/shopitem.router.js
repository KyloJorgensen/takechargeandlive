'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var shopitem_controller_1 = require("./shopitem.controller");
var user_middleware_1 = require("../user/user.middleware");
var router = express_1.Router();
router
    .post('/', user_middleware_1.adminAuth, shopitem_controller_1.default.createShopItem)
    .put('/', user_middleware_1.adminAuth, shopitem_controller_1.default.updateShopItem)
    .get('/', shopitem_controller_1.default.getShopItems)
    .get('/:_shopItemId', shopitem_controller_1.default.getShopItem);
exports.default = router;
