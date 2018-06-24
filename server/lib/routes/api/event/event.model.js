'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var EventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    details: {
        type: String,
        default: '',
    },
    discontinued: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
exports.Event = mongoose_1.model('Event', EventSchema);
exports.default = exports.Event;
