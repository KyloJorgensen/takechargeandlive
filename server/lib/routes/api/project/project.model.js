'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CoverImageSchema = new mongoose_1.Schema({
    _imageId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Image',
    },
}, { timestamps: true });
var PageSchema = new mongoose_1.Schema({
    _imageId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Image',
    },
    title: {
        type: String,
        default: '',
    },
    details: {
        type: String,
        default: '',
    },
    page: {
        type: Number,
    },
    discontinued: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
var ProjectSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Date,
        required: true,
    },
    details: {
        type: String,
        default: '',
    },
    coverImage: CoverImageSchema,
    pages: [PageSchema],
    discontinued: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
exports.Project = mongoose_1.model('Project', ProjectSchema);
exports.default = exports.Project;
