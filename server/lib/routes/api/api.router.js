'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var event_router_1 = require("./event/event.router");
var project_router_1 = require("./project/project.router");
var image_router_1 = require("./image/image.router");
var newsitem_router_1 = require("./newsitem/newsitem.router");
var shopitem_router_1 = require("./shopitem/shopitem.router");
var user_router_1 = require("./user/user.router");
var router = express_1.Router();
router
    // .use('/checkout', checkoutRouter)
    .use('/event', event_router_1.default)
    .use('/project', project_router_1.default)
    .use('/image', image_router_1.default)
    .use('/newsitem', newsitem_router_1.default)
    .use('/shopitem', shopitem_router_1.default)
    .use('/user', user_router_1.default);
exports.default = router;
