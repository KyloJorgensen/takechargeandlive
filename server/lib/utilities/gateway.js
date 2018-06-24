'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var braintree_1 = require("braintree");
var variables_express_1 = require("../config/variables.express");
var environment = variables_express_1.BT_ENVIRONMENT.charAt(0).toUpperCase() + variables_express_1.BT_ENVIRONMENT.slice(1);
exports.default = braintree_1.connect({
    environment: braintree_1.Environment[environment],
    merchantId: variables_express_1.BT_MERCHANT_ID,
    publicKey: variables_express_1.BT_PUBLIC_KEY,
    privateKey: variables_express_1.BT_PRIVATE_KEY
});
