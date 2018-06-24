'use strict';

import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

const ADD_NEWS_ITEM = 'ADD_NEWS_ITEM';
const addNewsItem = function(post, callback) {
    const payload = {
        post: post,
    };
    return function(dispatch) {
        const url = '/api/newsitem';
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
            return dispatch(addNewsItemSuccess());
        })
        .catch(function(error) {
            callback(true);
            return dispatch(addNewsItemError(error));
        });
    };
};

const ADD_NEWS_ITEM_SUCCESS = "ADD_NEWS_ITEM_SUCCESS";
const addNewsItemSuccess = function() {
    return {
        type: ADD_NEWS_ITEM_SUCCESS,
    };
};

const ADD_NEWS_ITEM_ERROR = 'ADD_NEWS_ITEM_ERROR';
const addNewsItemError = function(error) {
    return {
        type: ADD_NEWS_ITEM_ERROR,
        error: error,
    };
};

exports.addNewsItem = addNewsItem;
exports.ADD_NEWS_ITEM_SUCCESS = ADD_NEWS_ITEM_SUCCESS;
exports.addNewsItemSuccess = addNewsItemSuccess;
exports.ADD_NEWS_ITEM_ERROR = ADD_NEWS_ITEM_ERROR;
exports.addNewsItemError = addNewsItemError;

const UPDATE_NEWS_ITEM = 'UPDATE_NEWS_ITEM';
const updateNewsItem = function(_new, _old, callback) {
    let payload = {_id: _old._newsItemId};
    let vaildKeys = ['post'];

    for (let i = 0; i < vaildKeys.length; i++) {
        if (_new[vaildKeys[i]] != _old[vaildKeys[i]]) {
            payload[vaildKeys[i]] = _new[vaildKeys[i]];
        }
    }
    
    return function(dispatch) {
        const url = '/api/newsitem';
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
            return dispatch(updateNewsItemSuccess());
        })
        .catch(function(error) {
            callback(true);
            return dispatch(updateNewsItemError(error));
        });
    };
};

const UPDATE_NEWS_ITEM_SUCCESS = "UPDATE_NEWS_ITEM_SUCCESS";
const updateNewsItemSuccess = function() {
    return {
        type: UPDATE_NEWS_ITEM_SUCCESS,
    };
};

const UPDATE_NEWS_ITEM_ERROR = 'UPDATE_NEWS_ITEM_ERROR';
const updateNewsItemError = function(error) {
    return {
        type: UPDATE_NEWS_ITEM_ERROR,
        error: error,
    };
};

exports.updateNewsItem = updateNewsItem;
exports.UPDATE_NEWS_ITEM_SUCCESS = UPDATE_NEWS_ITEM_SUCCESS;
exports.updateNewsItemSuccess = updateNewsItemSuccess;
exports.UPDATE_NEWS_ITEM_ERROR = UPDATE_NEWS_ITEM_ERROR;
exports.updateNewsItemError = updateNewsItemError;

const getNewsItems = function(query){
    return function(dispatch) {
        dispatch(gettingNewsItems());
        let querydefaults = {
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
        let _url = '/api/newsitem' + _query;
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
            return dispatch(getNewsItemsSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getNewsItemsError(error));
        });
    };
};

const getMoreNewsItems = function(url) {
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
            return dispatch(getNewsItemsSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getNewsItemsError(error));
        });
    }
};

const GETTING_NEWS_ITEMS = 'GETTING_NEWS_ITEMS';
const gettingNewsItems = function() {
    return {
        type: GETTING_NEWS_ITEMS,
    };
}

const GET_NEWS_ITEMS_SUCCESS = 'GET_NEWS_ITEMS_SUCCESS';
const getNewsItemsSuccess = function(response) {
    return {
        type: GET_NEWS_ITEMS_SUCCESS,
        newsItemsPage: response.page,
        newsItemsTotalPages: response.totalPages,
        newsItemsPageLimit: response.limit,
        newsItemsTotal: response.total,
        newsItemsTotalBatch: response.pageTotal,
        newsItems: response.newsItems,
    };
};

const GET_NEWS_ITEMS_ERROR = 'GET_NEWS_ITEMS_ERROR';
const getNewsItemsError = function(error) {
    console.log(error);
    return {
        type: GET_NEWS_ITEMS_ERROR,
        error: error
    };
};


exports.getNewsItems = getNewsItems;
exports.getMoreNewsItems = getMoreNewsItems;
exports.GET_NEWS_ITEMS_SUCCESS = GET_NEWS_ITEMS_SUCCESS;
exports.getNewsItemsSuccess = getNewsItemsSuccess;
exports.GET_NEWS_ITEMS_ERROR = GET_NEWS_ITEMS_ERROR;
exports.getNewsItemsError = getNewsItemsError;

const getNewsItem = function(_newsItemId){
    return function(dispatch) {
        dispatch(gettingNewsItems());

        let query = querystring.stringify({
            field: [
                '_id',
                'post',
            ],
            format: 'json',
        });
        query = query ? '?'+query : '';
        let _url = '/api/newsitem/' + _newsItemId + query;
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
            return dispatch(getNewsItemSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getNewsItemError(error));
        });
    };
};

const GET_NEWS_ITEM_SUCCESS = 'GET_NEWS_ITEM_SUCCESS';
const getNewsItemSuccess = function(response) {
    return {
        type: GET_NEWS_ITEM_SUCCESS,
        _id: response._id,
        post: response.post,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
    };
};

const GET_NEWS_ITEM_ERROR = 'GET_NEWS_ITEM_ERROR';
const getNewsItemError = function(error) {
    console.log(error);
    return {
        type: GET_NEWS_ITEM_ERROR,
        error: error
    };
};


exports.getNewsItem = getNewsItem;
exports.GET_NEWS_ITEM_SUCCESS = GET_NEWS_ITEM_SUCCESS;
exports.getNewsItemSuccess = getNewsItemSuccess;
exports.GET_NEWS_ITEM_ERROR = GET_NEWS_ITEM_ERROR;
exports.getNewsItemError = getNewsItemError;