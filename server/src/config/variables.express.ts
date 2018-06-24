'use strict';

import * as path from 'path';

// require('dotenv').load();

export const HTTP_PORT = process.env.HTTP_PORT || '8080';
export const EXPRESS_LISTEN_MESSAGE = 'Listening on port: ';
export const MONGODB_PORT = process.env.MONGODB_PORT || "";
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/pencil4life';
export const SESSION_SECRET = process.env.SESSION_SECRET || '374c62f257a71467e636c59b1dde6';
export const SESSION_COLLECTION = process.env.SESSION_COLLECTION || 'sessions';
export const IMAGE_DIR = path.join(__dirname , process.env.IMAGE_DIR || '../../assests/images/');
export const BT_ENVIRONMENT = process.env.BT_ENVIRONMENT || 'sandbox';
export const BT_MERCHANT_ID = process.env.BT_MERCHANT_ID || 'cvnqcc9z7srpfkcf';
export const BT_PUBLIC_KEY = process.env.BT_PUBLIC_KEY || 'k7x3r67pkqn4m59p';
export const BT_PRIVATE_KEY = process.env.BT_PRIVATE_KEY || 'e4614ba54f975cd132f2b52437b5fbe6';

export default {
    HTTP_PORT: HTTP_PORT,
    EXPRESS_LISTEN_MESSAGE: EXPRESS_LISTEN_MESSAGE,
    MONGODB_PORT: MONGODB_PORT,
    MONGODB_URL: MONGODB_URL,
    SESSION_SECRET: SESSION_SECRET,
    SESSION_COLLECTION: SESSION_COLLECTION,
    IMAGE_DIR: IMAGE_DIR,
    BT_ENVIRONMENT: BT_ENVIRONMENT,
    BT_MERCHANT_ID: BT_MERCHANT_ID,
    BT_PUBLIC_KEY: BT_PUBLIC_KEY,
    BT_PRIVATE_KEY: BT_PRIVATE_KEY,
};