'use strict';

import * as http from 'http';
import app from './app';
import { HTTP_PORT } from './config/variables.express';

http.createServer(app).listen(HTTP_PORT, function () {
	const _date = new Date();
	console.log(_date.toUTCString() +" | Listening on port: " + HTTP_PORT);
});