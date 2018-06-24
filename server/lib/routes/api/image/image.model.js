'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CounterSchema = new mongoose_1.Schema({
    type: {
        type: String,
        unique: true,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
});
exports.Counter = mongoose_1.model('Counter', CounterSchema);
var ImageSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    src: {
        type: String,
    },
    alt: {
        type: String,
    },
    originalSrc: {
        type: String,
    },
    originalName: {
        type: String,
        required: true,
    },
    filename: {
        type: String
    },
    secure: {
        type: Boolean,
        default: false
    },
    discontinued: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
var pad = function (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
ImageSchema.pre('save', function (next) {
    var doc = this;
    exports.Counter.findByIdAndUpdate({ type: 'imageId' }, { $inc: { seq: 1 } }, { upsert: true, setDefaultsOnInsert: true }, function (error, counter) {
        if (error)
            return next(error);
        doc.filename = pad(counter.seq, 10) + '.' + doc.originalName.split('.').pop().toLowerCase();
        next();
    });
});
exports.Image = mongoose_1.model('Image', ImageSchema);
