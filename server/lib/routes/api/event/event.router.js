'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var event_controller_1 = require("./event.controller");
var user_middleware_1 = require("../user/user.middleware");
var router = express_1.Router();
router.post('/', user_middleware_1.adminAuth, event_controller_1.default.createEventItem)
    .put('/', user_middleware_1.adminAuth, event_controller_1.default.updateEventItem)
    .get('/', event_controller_1.default.getEventItems)
    .get('/:_eventItemId', event_controller_1.default.getEventItem);
exports.default = router;
