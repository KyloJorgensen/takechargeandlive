'use strict';

import { Router } from 'express';

import controller from './report-violation.controller';

const router = Router();

router.post('/', controller.reportViolation)

export default router;