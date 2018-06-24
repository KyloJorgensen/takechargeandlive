'use strict';

import mainRouter from '../routes/main/main.router';
import apiRouter from '../routes/api/api.router';
import reportViolationRouter from '../routes/report-violation/report-violation.router';

export default (app) => {
    app.use('/', mainRouter)
        .use('/api', apiRouter)
        .post('/report-violation', reportViolationRouter)
};