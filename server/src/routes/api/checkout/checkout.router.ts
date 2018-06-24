'use strict';

import { Router } from 'express';
import controller from './checkout.controller';

const router = Router();

router.get('/', controller.redirect)
	.get('/new', controller.new)
	.get('/:id', controller.transaction)
	.post('/', controller.sale);

export default router;