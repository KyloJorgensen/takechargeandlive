'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var image_controller_1 = require("./image.controller");
var user_middleware_1 = require("../user/user.middleware");
var router = express_1.Router();
router.post('/', user_middleware_1.adminAuth, image_controller_1.default.createImage)
    .put('/', user_middleware_1.adminAuth, image_controller_1.default.updateImage)
    .get('/', user_middleware_1.adminAuth, image_controller_1.default.getImages)
    .get('/:_imageId', user_middleware_1.adminAuth, image_controller_1.default.getImage);
exports.default = router;
