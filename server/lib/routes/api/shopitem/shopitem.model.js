'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var diffHistory_1 = require("mongoose-diff-history/diffHistory");
var ShopItemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        get: function (v) { return Math.round(parseFloat(v) * 100) / 100; },
        set: function (v) { return Math.round(parseFloat(v) * 100) / 100; },
        default: 0,
    },
    stock: {
        type: Number,
        min: 0,
        get: function (v) { return Math.round(v); },
        set: function (v) { return Math.round(v); },
        default: 0,
    },
    sold: {
        type: Number,
        min: 0,
        get: function (v) { return Math.round(v); },
        set: function (v) { return Math.round(v); },
        default: 0,
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
});
ShopItemSchema.plugin(diffHistory_1.plugin);
exports.ShopItem = mongoose_1.model('ShopItem', ShopItemSchema);
exports.default = exports.ShopItem;
