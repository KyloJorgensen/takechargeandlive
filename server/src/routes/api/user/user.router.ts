'use strict';

import { Router } from 'express';
import controller from './user.controller';
import { userAuth } from './user.middleware';

const router = Router();

router
	.post('/', controller.createUser)
	.get('/', userAuth, controller.getUser)
	.put('/', userAuth, controller.updateUser)
	.post('/login', controller.login)
	.put('/login', userAuth, controller.updateUserPassword)
	.all('/logout', controller.logout)

export default router;