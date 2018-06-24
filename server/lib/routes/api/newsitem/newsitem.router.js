'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var newsitem_controller_1 = require("./newsitem.controller");
var user_middleware_1 = require("../user/user.middleware");
var router = express_1.Router();
router.post('/', user_middleware_1.adminAuth, newsitem_controller_1.default.createNewsItem)
    .put('/', user_middleware_1.adminAuth, newsitem_controller_1.default.updateNewsItem)
    .get('/', newsitem_controller_1.default.getNewsItems)
    .get('/:_newsItemId', newsitem_controller_1.default.getNewsItem);
exports.default = router;
