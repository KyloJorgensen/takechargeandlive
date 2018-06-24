'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var NewsItemSchema = new mongoose_1.Schema({
    post: {
        type: String,
        required: true,
    },
    created_by: {
        type: String,
        required: true,
    },
    updated_by: {
        type: String,
        required: true,
    },
    discontinued: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
exports.NewsItem = mongoose_1.model('NewsItem', NewsItemSchema);
exports.default = exports.NewsItem;
