'use strict';

import { Router } from 'express';
import controller from './shopitem.controller';
import { adminAuth } from '../user/user.middleware';

const router = Router();

router
	.post('/', adminAuth, controller.createShopItem)
	.put('/', adminAuth, controller.updateShopItem)
	.get('/', controller.getShopItems)
	.get('/:_shopItemId', controller.getShopItem)

export default router;