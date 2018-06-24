'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var project_controller_1 = require("./project.controller");
var user_middleware_1 = require("../user/user.middleware");
var router = express_1.Router();
router.post('/', user_middleware_1.adminAuth, project_controller_1.default.createProject)
    .put('/', user_middleware_1.adminAuth, project_controller_1.default.updateProject)
    .get('/', project_controller_1.default.getProjects)
    .get('/:_projectId', project_controller_1.default.getProject)
    .post('/:_projectId/page/', user_middleware_1.adminAuth, project_controller_1.default.createProjectPage)
    .put('/:_projectId/page/:_pageId', user_middleware_1.adminAuth, project_controller_1.default.updateProjectPage)
    .get('/:_projectId/page/', project_controller_1.default.getProjectPages)
    .get('/:_projectId/page/:_pageId', project_controller_1.default.getProjectPage);
exports.default = router;
