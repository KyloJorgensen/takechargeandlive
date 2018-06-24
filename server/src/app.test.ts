'use strict';

import * as request from 'supertest';
import app from './app';

describe('Test the root path', () => {
    it('should response the GET method', () => {
        return request(app).get("/").then(response => {
            expect(response.status).toBe(200);
        });
    });
});