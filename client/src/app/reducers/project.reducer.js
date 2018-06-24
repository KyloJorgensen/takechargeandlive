'use strict';

import actions from '../actions/project.actions';
import objectPath from 'object-path';

const projectInitialState = {
    projectsDisplay: null,
    projectList: null,
    projectListLength: null,
    projectsPage: null,
    projectsTotalPages: null,
    projectsPageLimit: null,
    projectsTotal: null,
    projectsTotalBatch: null,
};

const projectReducer = function(state, action) {
    state = state || projectInitialState;
    const _state = state;
    if (action.type === actions.GET_PROJECTS_SUCCESS) {
        _state.projectsDisplay = action.projects;
        // _state.projectList = action.projects;

        _state.projectsPage = action.projectsPage; 
        _state.projectsTotalPages = action.projectsTotalPages; 
        _state.projectsPageLimit = action.projectsPageLimit; 
        _state.projectsTotal = action.projectsTotal; 
        _state.projectsTotalBatch = action.projectsTotalBatch; 
        // _state.projects = action.projects; 
    }    
    if (action.type === actions.GET_PROJECTS_ERROR) {
        _state.projectList = null;
        _state.projectsPage = null;
        _state.projectsTotalPages = null;
        _state.projectsPageLimit = null;
        _state.projectsTotal = null;
        _state.projectsTotalBatch = null;
    }
    if (action.type === actions.GET_PROJECT_SUCCESS) {
        _state.projectList = _state.projectList || {};
        const project = action.response;



        _state.projectList[project._id] = {
            _id: project._id,
            title: project.title,
            year: project.year,
            details: project.details,
            discontinued: project.discontinued,
            coverImage: objectPath.get(project, "coverImage", {_imageId: null}),
        };
    }    
    if (action.type === actions.GET_PROJECT_ERROR) {
        console.error(action.error);
    }
    if (_state.projectList !== null) {
    	_state.projectListLength = Object.keys(_state.projectList).length;
    }
    return _state;
};

export default projectReducer;