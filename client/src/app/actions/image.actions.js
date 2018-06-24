'use strict';

import _fetch from 'isomorphic-fetch';
import querystring from 'querystring';
import 'whatwg-fetch';

const ADD_IMAGE = 'ADD_IMAGE';
const addImage = function(newImage, callback) {
    const data = new FormData();
    data.append('image', newImage.image);
    data.append('name', newImage.name);
    data.append('alt', newImage.alt);

    return function(dispatch) {
        const url = '/api/image';
        return fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            body: data, 
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
            return dispatch(addImageSuccess());
        })
        .catch(function(error) {
            callback(true);
            return dispatch(addImageError(error));
        });
    };
};

const ADD_IMAGE_SUCCESS = "ADD_IMAGE_SUCCESS";
const addImageSuccess = function() {
    return {
        type: ADD_IMAGE_SUCCESS,
    };
};

const ADD_IMAGE_ERROR = 'ADD_IMAGE_ERROR';
const addImageError = function(error) {
    return {
        type: ADD_IMAGE_ERROR,
        error: error,
    };
};

exports.addImage = addImage;
exports.ADD_IMAGE_SUCCESS = ADD_IMAGE_SUCCESS;
exports.addImageSuccess = addImageSuccess;
exports.ADD_IMAGE_ERROR = ADD_IMAGE_ERROR;
exports.addImageError = addImageError;

const UPDATE_IMAGE = 'UPDATE_IMAGE';
const updateImage = function(_new, _old, callback) {
    const data = new FormData();
    data.append('_id', _old._imageId);
    let vaildKeys = ['name', 'alt', 'image', 'discontinued'];
    vaildKeys.forEach(function(_key) {
        if (_key == 'image') {
            if (_new.image.name) {
                data.append('image', _new.image);
            }
        } else if (_new[_key] != _old[_key]) {
            data.append(_key, _new[_key]);
        }
    })
    for(var pair of data.entries()) {
       console.log(pair[0]+ ', '+ pair[1]); 
    }
    
    return function(dispatch) {
        const url = '/api/image';
        return fetch(url, {
            method: 'PUT',
            credentials: 'same-origin',
            body: data, 
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
            return dispatch(updateImageSuccess());
        })
        .catch(function(error) {
            callback(true);
            return dispatch(updateImageError(error));
        });
    };
};

const UPDATE_IMAGE_SUCCESS = "UPDATE_IMAGE_SUCCESS";
const updateImageSuccess = function() {
    return {
        type: UPDATE_IMAGE_SUCCESS,
    };
};

const UPDATE_IMAGE_ERROR = 'UPDATE_IMAGE_ERROR';
const updateImageError = function(error) {
    return {
        type: UPDATE_IMAGE_ERROR,
        error: error,
    };
};

exports.updateImage = updateImage;
exports.UPDATE_IMAGE_SUCCESS = UPDATE_IMAGE_SUCCESS;
exports.updateImageSuccess = updateImageSuccess;
exports.UPDATE_IMAGE_ERROR = UPDATE_IMAGE_ERROR;
exports.updateImageError = updateImageError;

const getImages = function(query){
    return function(dispatch) {
        dispatch(gettingImages());
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
        let _url = '/api/image' + _query;
        return _fetch(_url, {
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
            return dispatch(getImagesSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getImagesError(error));
        });
    };
};

const getMoreImages = function(url) {
    return function(dispatch) {
        return _fetch(url, {
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
            return dispatch(getImagesSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getImagesError(error));
        });
    }
};

const GETTING_IMAGES = 'GETTING_IMAGES';
const gettingImages = function() {
    return {
        type: GETTING_IMAGES,
    };
}

const GET_IMAGES_SUCCESS = 'GET_IMAGES_SUCCESS';
const getImagesSuccess = function(response) {
    return {
        type: GET_IMAGES_SUCCESS,
        imagesPage: response.page,
        imagesTotalPages: response.totalPages,
        imagesPageLimit: response.limit,
        imagesTotal: response.total,
        imagesTotalBatch: response.pageTotal,
        images: response.images,
    };
};

const GET_IMAGES_ERROR = 'GET_IMAGES_ERROR';
const getImagesError = function(error) {
    console.log(error);
    return {
        type: GET_IMAGES_ERROR,
        error: error
    };
};


exports.getImages = getImages;
exports.getMoreImages = getMoreImages;
exports.GET_IMAGES_SUCCESS = GET_IMAGES_SUCCESS;
exports.getImagesSuccess = getImagesSuccess;
exports.GET_IMAGES_ERROR = GET_IMAGES_ERROR;
exports.getImagesError = getImagesError;

const getImage = function(_imageId){
    return function(dispatch) {
        dispatch(gettingImages());

        let query = querystring.stringify({
            field: [
                '_id',
                'name',
                'alt',
                'filename',
                'discontinued',
            ],
            format: 'json',
        });
        query = query ? '?'+query : '';
        let _url = '/api/image/' + _imageId + query;
        return _fetch(_url, {
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
            return dispatch(getImageSuccess(response));
        })
        .catch(function(error) {
            return dispatch(getImageError(error));
        });
    };
};

const GET_IMAGE_SUCCESS = 'GET_IMAGE_SUCCESS';
const getImageSuccess = function(response) {
    return {
        type: GET_IMAGE_SUCCESS,
        _id: response._id,
        name: response.name,
        alt: response.alt,
        filename: response.filename,
        discontinued: response.discontinued,
    };
};

const GET_IMAGE_ERROR = 'GET_IMAGE_ERROR';
const getImageError = function(error) {
    console.log(error);
    return {
        type: GET_IMAGE_ERROR,
        error: error
    };
};


exports.getImage = getImage;
exports.GET_IMAGE_SUCCESS = GET_IMAGE_SUCCESS;
exports.getImageSuccess = getImageSuccess;
exports.GET_IMAGE_ERROR = GET_IMAGE_ERROR;
exports.getImageError = getImageError;