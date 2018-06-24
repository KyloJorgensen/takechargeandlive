'use strict';

import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

const ADD_SHOP_ITEM = 'ADD_SHOP_ITEM';
const addShopItem = function(name, price, callback) {
    const payload = {
        name: name,
        price: price,
    };
    return function(dispatch) {
        const url = '/api/shopitem';
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
            return dispatch(addShopItemSuccess());
        })
        .catch(function(error) {
            callback(true);
            return dispatch(addShopItemError(error));
        });
    };
};

const ADD_SHOP_ITEM_SUCCESS = "ADD_SHOP_ITEM_SUCCESS";
const addShopItemSuccess = function() {
    return {
        type: ADD_SHOP_ITEM_SUCCESS,
    };
};

const ADD_SHOP_ITEM_ERROR = 'ADD_SHOP_ITEM_ERROR';
const addShopItemError = function(error) {
    return {
        type: ADD_SHOP_ITEM_ERROR,
        error: error,
    };
};

exports.addShopItem = addShopItem;
exports.ADD_SHOP_ITEM_SUCCESS = ADD_SHOP_ITEM_SUCCESS;
exports.addShopItemSuccess = addShopItemSuccess;
exports.ADD_SHOP_ITEM_ERROR = ADD_SHOP_ITEM_ERROR;
exports.addShopItemError = addShopItemError;

const UPDATE_SHOP_ITEM = 'UPDATE_SHOP_ITEM';
const updateShopItem = function(_new, _old, callback) {
    let payload = {_id: _old._shopItemId};
    let vaildKeys = ['name', 'price'];

    for (let i = 0; i < vaildKeys.length; i++) {
        if (_new[vaildKeys[i]] != _old[vaildKeys[i]]) {
            payload[vaildKeys[i]] = _new[vaildKeys[i]];
        }
    }
    
    return function(dispatch) {
        const url = '/api/shopitem';
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
            return dispatch(updateShopItemSuccess());
        })
        .catch(function(error) {
            callback(true);
            return dispatch(updateShopItemError(error));
        });
    };
};

const UPDATE_SHOP_ITEM_SUCCESS = "UPDATE_SHOP_ITEM_SUCCESS";
const updateShopItemSuccess = function() {
    return {
        type: UPDATE_SHOP_ITEM_SUCCESS,
    };
};

const UPDATE_SHOP_ITEM_ERROR = 'UPDATE_SHOP_ITEM_ERROR';
const updateShopItemError = function(error) {
    return {
        type: UPDATE_SHOP_ITEM_ERROR,
        error: error,
    };
};

exports.updateShopItem = updateShopItem;
exports.UPDATE_SHOP_ITEM_SUCCESS = UPDATE_SHOP_ITEM_SUCCESS;
exports.updateShopItemSuccess = updateShopItemSuccess;
exports.UPDATE_SHOP_ITEM_ERROR = UPDATE_SHOP_ITEM_ERROR;
exports.updateShopItemError = updateShopItemError;

const getShopItems = function(){
    return function(dispatch) {
        dispatch(gettingShopItems());

        let query = querystring.stringify({
            discontinued: true,
            limit: 100,
            format: 'json',
        });
        query = query ? '?'+query : '';
        let _url = '/api/shopitem' + query;
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
            return dispatch(getShopItemsSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getShopItemsError(error));
        });
    };
};

const getMoreShopItems = function(url) {
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
            return dispatch(getShopItemsSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getShopItemsError(error));
        });
    }
};

const GETTING_SHOP_ITEMS = 'GETTING_SHOP_ITEMS';
const gettingShopItems = function() {
    return {
        type: GETTING_SHOP_ITEMS,
    };
}

const GET_SHOP_ITEMS_SUCCESS = 'GET_SHOP_ITEMS_SUCCESS';
const getShopItemsSuccess = function(response) {
    return {
        type: GET_SHOP_ITEMS_SUCCESS,
        shopItemsPage: response.page,
        shopItemsTotalPages: response.totalPages,
        shopItemsPageLimit: response.limit,
        shopItemsTotal: response.total,
        shopItemsTotalBatch: response.pageTotal,
        shopItems: response.shopItems,
    };
};

const GET_SHOP_ITEMS_ERROR = 'GET_SHOP_ITEMS_ERROR';
const getShopItemsError = function(error) {
    console.log(error);
    return {
        type: GET_SHOP_ITEMS_ERROR,
        error: error
    };
};


exports.getShopItems = getShopItems;
exports.getMoreShopItems = getMoreShopItems;
exports.GET_SHOP_ITEMS_SUCCESS = GET_SHOP_ITEMS_SUCCESS;
exports.getShopItemsSuccess = getShopItemsSuccess;
exports.GET_SHOP_ITEMS_ERROR = GET_SHOP_ITEMS_ERROR;
exports.getShopItemsError = getShopItemsError;

const getShopItem = function(_shopItemId){
    return function(dispatch) {
        dispatch(gettingShopItems());

        let query = querystring.stringify({
            field: [
                '_id',
                'name',
                'price',
            ],
            format: 'json',
        });
        query = query ? '?'+query : '';
        let _url = '/api/shopitem/' + _shopItemId + query;
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
            return dispatch(getShopItemSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getShopItemError(error));
        });
    };
};

const GET_SHOP_ITEM_SUCCESS = 'GET_SHOP_ITEM_SUCCESS';
const getShopItemSuccess = function(response) {
    return {
        type: GET_SHOP_ITEM_SUCCESS,
        _id: response._id,
        name: response.name,
        price: response.price,
    };
};

const GET_SHOP_ITEM_ERROR = 'GET_SHOP_ITEM_ERROR';
const getShopItemError = function(error) {
    console.log(error);
    return {
        type: GET_SHOP_ITEM_ERROR,
        error: error
    };
};


exports.getShopItem = getShopItem;
exports.GET_SHOP_ITEM_SUCCESS = GET_SHOP_ITEM_SUCCESS;
exports.getShopItemSuccess = getShopItemSuccess;
exports.GET_SHOP_ITEM_ERROR = GET_SHOP_ITEM_ERROR;
exports.getShopItemError = getShopItemError;