'use strict';

import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

const ADD_EVENT_ITEM = 'ADD_EVENT_ITEM';
const addEventItem = function(title, start_date, end_date, details, callback) {
    const payload = {
        title: title,
        start_date: start_date,
        end_date: end_date,
        details: details,
    };
    return function(dispatch) {
        const url = '/api/event';
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
            return dispatch(addEventItemSuccess());
        })
        .catch(function(error) {
            callback(true);
            return dispatch(addEventItemError(error));
        });
    };
};

const ADD_EVENT_ITEM_SUCCESS = "ADD_EVENT_ITEM_SUCCESS";
const addEventItemSuccess = function() {
    return {
        type: ADD_EVENT_ITEM_SUCCESS,
    };
};

const ADD_EVENT_ITEM_ERROR = 'ADD_EVENT_ITEM_ERROR';
const addEventItemError = function(error) {
    return {
        type: ADD_EVENT_ITEM_ERROR,
        error: error,
    };
};

exports.addEventItem = addEventItem;
exports.ADD_EVENT_ITEM_SUCCESS = ADD_EVENT_ITEM_SUCCESS;
exports.addEventItemSuccess = addEventItemSuccess;
exports.ADD_EVENT_ITEM_ERROR = ADD_EVENT_ITEM_ERROR;
exports.addEventItemError = addEventItemError;

const UPDATE_EVENT_ITEM = 'UPDATE_EVENT_ITEM';
const updateEventItem = function(_new, _old, callback) {
    let payload = {_id: _old._eventItemId};
    let vaildKeys = ['title', 'start_date', 'end_date', 'details', 'discontinued'];

    for (let i = 0; i < vaildKeys.length; i++) {
        if (_new[vaildKeys[i]] != _old[vaildKeys[i]]) {
            payload[vaildKeys[i]] = _new[vaildKeys[i]];
        }
    }
    
    return function(dispatch) {
        const url = '/api/event';
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
            return dispatch(updateEventItemSuccess());
        })
        .catch(function(error) {
            callback(true);
            return dispatch(updateEventItemError(error));
        });
    };
};

const UPDATE_EVENT_ITEM_SUCCESS = "UPDATE_EVENT_ITEM_SUCCESS";
const updateEventItemSuccess = function() {
    return {
        type: UPDATE_EVENT_ITEM_SUCCESS,
    };
};

const UPDATE_EVENT_ITEM_ERROR = 'UPDATE_EVENT_ITEM_ERROR';
const updateEventItemError = function(error) {
    return {
        type: UPDATE_EVENT_ITEM_ERROR,
        error: error,
    };
};

exports.updateEventItem = updateEventItem;
exports.UPDATE_EVENT_ITEM_SUCCESS = UPDATE_EVENT_ITEM_SUCCESS;
exports.updateEventItemSuccess = updateEventItemSuccess;
exports.UPDATE_EVENT_ITEM_ERROR = UPDATE_EVENT_ITEM_ERROR;
exports.updateEventItemError = updateEventItemError;

const getEventItems = function(query){
    return function(dispatch) {
        dispatch(gettingEventItems());
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
        let _url = '/api/event' + _query;
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
            return dispatch(getEventItemsSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getEventItemsError(error));
        });
    };
};

const getMoreEventItems = function(url) {
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
            return dispatch(getEventItemsSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getEventItemsError(error));
        });
    }
};

const GETTING_EVENT_ITEMS = 'GETTING_EVENT_ITEMS';
const gettingEventItems = function() {
    return {
        type: GETTING_EVENT_ITEMS,
    };
}

const GET_EVENT_ITEMS_SUCCESS = 'GET_EVENT_ITEMS_SUCCESS';
const getEventItemsSuccess = function(response) {
    return {
        type: GET_EVENT_ITEMS_SUCCESS,
        eventItemsPage: response.page,
        eventItemsTotalPages: response.totalPages,
        eventItemsPageLimit: response.limit,
        eventItemsTotal: response.total,
        eventItemsTotalBatch: response.pageTotal,
        eventItems: response.eventItems,
    };
};

const GET_EVENT_ITEMS_ERROR = 'GET_EVENT_ITEMS_ERROR';
const getEventItemsError = function(error) {
    console.log(error);
    return {
        type: GET_EVENT_ITEMS_ERROR,
        error: error
    };
};


exports.getEventItems = getEventItems;
exports.getMoreEventItems = getMoreEventItems;
exports.GET_EVENT_ITEMS_SUCCESS = GET_EVENT_ITEMS_SUCCESS;
exports.getEventItemsSuccess = getEventItemsSuccess;
exports.GET_EVENT_ITEMS_ERROR = GET_EVENT_ITEMS_ERROR;
exports.getEventItemsError = getEventItemsError;

const getEventItem = function(_eventItemId){
    return function(dispatch) {
        dispatch(gettingEventItems());

        let query = querystring.stringify({
            field: [
                '_id',
                'title',
                'start_date',
                'end_date',
                'details',
                'discontinued',
            ],
            format: 'json',
        });
        query = query ? '?'+query : '';
        let _url = '/api/event/' + _eventItemId + query;
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
            return dispatch(getEventItemSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getEventItemError(error));
        });
    };
};

const GET_EVENT_ITEM_SUCCESS = 'GET_EVENT_ITEM_SUCCESS';
const getEventItemSuccess = function(response) {
    return {
        type: GET_EVENT_ITEM_SUCCESS,
        _id: response._id,
        title: response.title,
        start_date: response.start_date,
        end_date: response.end_date,
        details: response.details,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
        discontinued: response.discontinued,
    };
};

const GET_EVENT_ITEM_ERROR = 'GET_EVENT_ITEM_ERROR';
const getEventItemError = function(error) {
    console.log(error);
    return {
        type: GET_EVENT_ITEM_ERROR,
        error: error
    };
};


exports.getEventItem = getEventItem;
exports.GET_EVENT_ITEM_SUCCESS = GET_EVENT_ITEM_SUCCESS;
exports.getEventItemSuccess = getEventItemSuccess;
exports.GET_EVENT_ITEM_ERROR = GET_EVENT_ITEM_ERROR;
exports.getEventItemError = getEventItemError;