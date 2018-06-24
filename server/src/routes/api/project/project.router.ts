'use strict';

import { Router } from 'express';
import controller from './project.controller';
import { adminAuth } from '../user/user.middleware';

const router = Router();

router.post('/', adminAuth, controller.createProject)
	.put('/', adminAuth, controller.updateProject)
	.get('/', controller.getProjects)
	.get('/:_projectId', controller.getProject)
	.post('/:_projectId/page/', adminAuth, controller.createProjectPage)
	.put('/:_projectId/page/:_pageId', adminAuth, controller.updateProjectPage)
	.get('/:_projectId/page/', controller.getProjectPages)
	.get('/:_projectId/page/:_pageId', controller.getProjectPage)

export default router;