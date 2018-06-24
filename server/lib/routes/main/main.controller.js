'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
function MainController() { }
;
// returns index.html
MainController.prototype.getRoot = function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../../../dist/index.html'));
};
exports.default = MainController.prototype;
