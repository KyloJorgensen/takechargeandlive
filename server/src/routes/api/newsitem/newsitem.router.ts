'use strict';

import { Router } from 'express';
import controller from './newsitem.controller';
import { adminAuth } from '../user/user.middleware';

const router = Router();

router.post('/', adminAuth, controller.createNewsItem)
	.put('/', adminAuth, controller.updateNewsItem)
	.get('/', controller.getNewsItems)
	.get('/:_newsItemId', controller.getNewsItem)

export default router;