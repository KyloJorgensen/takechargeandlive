'use strict';

import { Router } from 'express';
import controller from './event.controller';
import { adminAuth } from '../user/user.middleware';

const router = Router();

router.post('/', adminAuth, controller.createEventItem)
	.put('/', adminAuth, controller.updateEventItem)
	.get('/', controller.getEventItems)
	.get('/:_eventItemId', controller.getEventItem)

export default router;