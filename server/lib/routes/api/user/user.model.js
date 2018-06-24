'use strict';
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt = require("bcryptjs");
var userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    discontinued: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });
userSchema.methods.validatePassword = function (password, callback) {
    bcrypt.compare(password, _this.password, function (err, isValid) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, isValid);
    });
};
exports.User = mongoose_1.model('User', userSchema);
exports.default = exports.User;
