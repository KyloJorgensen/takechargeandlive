'use strict';

import { Router } from 'express';
import controller from './image.controller';
import { adminAuth } from '../user/user.middleware';

const router = Router();

router.post('/', adminAuth, controller.createImage)
	.put('/', adminAuth, controller.updateImage)
	.get('/', adminAuth, controller.getImages)
	.get('/:_imageId', adminAuth, controller.getImage)

export default router;