'use strict';

import { connection, disconnect, connect } from 'mongoose';
import { MONGODB_URL } from './variables.express';

var db = connection;

db.on('connecting', function() {
    console.log('connecting');
});

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    disconnect();
});

db.on('connected', function() {
    console.log('connected!');
});

db.once('open', function() {
    console.log('connection open');
});

db.on('reconnected', function () {
    console.log('reconnected');
});
db.on('disconnected', function() {
    console.log('disconnected');
    console.log('MONGODB_URL is: '+MONGODB_URL);
    connect(MONGODB_URL, {
    	autoReconnect:true,
    	connectTimeoutMS: 500,
    	reconnectTries: Number.MAX_VALUE,
    });
});

connect(MONGODB_URL, {autoReconnect:true});