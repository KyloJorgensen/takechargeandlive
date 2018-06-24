'use strict';

import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

const ADD_PROJECT = 'ADD_PROJECT';
const addProject = function(newProject, callback) {

    const payload = {
        title: newProject.title,
        year: newProject.year,
        details: newProject.details,
    };

    if ('coverImage' in newProject) {
        const { coverImage } = newProject;
        payload.coverImage = {};
        if ('_imageId' in coverImage) {
            payload.coverImage._imageId = coverImage._imageId;
        }
    }
    return function(dispatch) {
        const url = '/api/project';
        return fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload), 
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            callback(false, response._id);
            return dispatch(addProjectSuccess());
        })
        .catch(function(error) {
            callback(true);
            return dispatch(addProjectError(error));
        });
    };
};

const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";
const addProjectSuccess = function() {
    return {
        type: ADD_PROJECT_SUCCESS,
    };
};

const ADD_PROJECT_ERROR = 'ADD_PROJECT_ERROR';
const addProjectError = function(error) {
    return {
        type: ADD_PROJECT_ERROR,
        error: error,
    };
};

exports.addProject = addProject;
exports.ADD_PROJECT_SUCCESS = ADD_PROJECT_SUCCESS;
exports.addProjectSuccess = addProjectSuccess;
exports.ADD_PROJECT_ERROR = ADD_PROJECT_ERROR;
exports.addProjectError = addProjectError;

const UPDATE_PROJECT = 'UPDATE_PROJECT';
const updateProject = function(_new, _old, callback) {
    let payload = {_id: _old._projectId};
    let vaildKeys = ['title', 'year', 'end_date', 'details', 'discontinued'];

    for (let i = 0; i < vaildKeys.length; i++) {
        if (_new[vaildKeys[i]] != _old[vaildKeys[i]]) {
            payload[vaildKeys[i]] = _new[vaildKeys[i]];
        }
    }
    
    return function(dispatch) {
        const url = '/api/project';
        return fetch(url, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload), 
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            callback(false);
            return dispatch(updateProjectSuccess());
        })
        .catch(function(error) {
            callback(true);
            return dispatch(updateProjectError(error));
        });
    };
};

const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";
const updateProjectSuccess = function() {
    return {
        type: UPDATE_PROJECT_SUCCESS,
    };
};

const UPDATE_PROJECT_ERROR = 'UPDATE_PROJECT_ERROR';
const updateProjectError = function(error) {
    return {
        type: UPDATE_PROJECT_ERROR,
        error: error,
    };
};

exports.updateProject = updateProject;
exports.UPDATE_PROJECT_SUCCESS = UPDATE_PROJECT_SUCCESS;
exports.updateProjectSuccess = updateProjectSuccess;
exports.UPDATE_PROJECT_ERROR = UPDATE_PROJECT_ERROR;
exports.updateProjectError = updateProjectError;

const getProjects = function(query){
    return function(dispatch) {
        dispatch(gettingProjects());
        const querydefaults = {
            limit: 100,
            format: 'json',
        };
        if (query) {
            if (!query.discontinued) {
                querydefaults.discontinued = false;
            }
            if (query.limit) {
                querydefaults.limit = query.limit;
            }
        } else {
            querydefaults.discontinued = false;
        }

        let _query = querystring.stringify(querydefaults);
        _query = _query ? '?'+_query : '';
        let _url = '/api/project' + _query;
        return fetch(_url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }   
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            return dispatch(getProjectsSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getProjectsError(error));
        });
    };
};

const getMoreProjects = function(url) {
    return function(dispatch) {
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }   
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            return dispatch(getProjectsSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getProjectsError(error));
        });
    }
};

const GETTING_PROJECTS = 'GETTING_PROJECTS';
const gettingProjects = function() {
    return {
        type: GETTING_PROJECTS,
    };
}

const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS';
const getProjectsSuccess = function(response) {
    return {
        type: GET_PROJECTS_SUCCESS,
        projectsPage: response.page,
        projectsTotalPages: response.totalPages,
        projectsPageLimit: response.limit,
        projectsTotal: response.total,
        projectsTotalBatch: response.pageTotal,
        projects: response.projects,
    };
};

const GET_PROJECTS_ERROR = 'GET_PROJECTS_ERROR';
const getProjectsError = function(error) {
    console.log(error);
    return {
        type: GET_PROJECTS_ERROR,
        error: error
    };
};

exports.getProjects = getProjects;
exports.getMoreProjects = getMoreProjects;
exports.GET_PROJECTS_SUCCESS = GET_PROJECTS_SUCCESS;
exports.getProjectsSuccess = getProjectsSuccess;
exports.GET_PROJECTS_ERROR = GET_PROJECTS_ERROR;
exports.getProjectsError = getProjectsError;

const getProject = function(_projectId){
    return function(dispatch) {
        dispatch(gettingProjects());

        let query = querystring.stringify({
            field: [
                '_id',
                'title',
                'year',
                'details',
                'discontinued',
            ],
            format: 'json',
        });
        query = query ? '?'+query : '';
        let _url = '/api/project/' + _projectId + query;
        return fetch(_url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }   
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            return dispatch(getProjectSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getProjectError(error));
        });
    };
};

const GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS';
const getProjectSuccess = function(response) {
    return {
        type: GET_PROJECT_SUCCESS,
        response: response
    };
};

const GET_PROJECT_ERROR = 'GET_PROJECT_ERROR';
const getProjectError = function(error) {
    console.log(error);
    return {
        type: GET_PROJECT_ERROR,
        error: error
    };
};

exports.getProject = getProject;
exports.GET_PROJECT_SUCCESS = GET_PROJECT_SUCCESS;
exports.getProjectSuccess = getProjectSuccess;
exports.GET_PROJECT_ERROR = GET_PROJECT_ERROR;
exports.getProjectError = getProjectError;

const getProjectPages = function(_projectId, query){
    return function(dispatch) {
        dispatch(gettingProjectPages());
        const querydefaults = {
            limit: 100,
            format: 'json',
        };
        if (query) {
            if (!query.discontinued) {
                querydefaults.discontinued = false;
            }
            if (query.limit) {
                querydefaults.limit = query.limit;
            }
        } else {
            querydefaults.discontinued = false;
        }

        let _query = querystring.stringify(querydefaults);
        _query = _query ? '?'+_query : '';
        let _url = '/api/project/' + _projectId + '/page' + _query;
        return fetch(_url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }   
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response)
            return dispatch(getProjectPagesSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getProjectPagesError(error));
        });
    };
};

const getMoreProjectPages = function(url) {
    return function(dispatch) {
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }   
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            return dispatch(getProjectPagesSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getProjectPagesError(error));
        });
    }
};

const GETTING_PROJECT_PAGES = 'GETTING_PROJECT_PAGES';
const gettingProjectPages = function() {
    return {
        type: GETTING_PROJECT_PAGES,
    };
}

const GET_PROJECT_PAGES_SUCCESS = 'GET_PROJECT_PAGES_SUCCESS';
const getProjectPagesSuccess = function(response) {
    return {
        type: GET_PROJECT_PAGES_SUCCESS,
        projectsPage: response.page,
        projectsTotalPages: response.totalPages,
        projectsPageLimit: response.limit,
        projectsTotal: response.total,
        projectsTotalBatch: response.pageTotal,
        projects: response.projects,
    };
};

const GET_PROJECT_PAGES_ERROR = 'GET_PROJECT_PAGES_ERROR';
const getProjectPagesError = function(error) {
    console.log(error);
    return {
        type: GET_PROJECT_PAGES_ERROR,
        error: error
    };
};

exports.getProjectPages = getProjectPages;
exports.getMoreProjectPages = getMoreProjectPages;
exports.GET_PROJECT_PAGES_SUCCESS = GET_PROJECT_PAGES_SUCCESS;
exports.getProjectPagesSuccess = getProjectPagesSuccess;
exports.GET_PROJECT_PAGES_ERROR = GET_PROJECT_PAGES_ERROR;
exports.getProjectPagesError = getProjectPagesError;