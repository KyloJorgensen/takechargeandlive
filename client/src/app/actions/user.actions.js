'use strict';

import fetch from 'isomorphic-fetch';

const userLogin = function(email, password, callback) {
    let payload = {
        email: email,
        password: password
    };

    let url = '/api/user/login';
    return function(dispatch) {
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
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            callback(false);
            return dispatch(userLoginSuccess(data));
        }).catch(function(error) {
            callback(true);
            return dispatch(userLoginError(error));
        });
    }
};

const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = function(data) {
    return {
        type: USER_LOGIN_SUCCESS,
        data: data
    };
};

const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
const userLoginError = function(error) {
    return {
        type: USER_LOGIN_ERROR,
        error: error
    };
};

exports.userLogin = userLogin;
exports.USER_LOGIN_SUCCESS = USER_LOGIN_SUCCESS;
exports.userLoginSuccess = userLoginSuccess;
exports.USER_LOGIN_ERROR = USER_LOGIN_ERROR;
exports.userLoginError = userLoginError;

const userLogout = function() {
    return function(dispatch) {
        const url = '/api/user/logout';
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },    
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(data) {
            return dispatch(userLogoutSuccess());
        })
        .catch(function(error) {
            return dispatch(userLogoutError(error));
        });
    }
};

const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
const userLogoutSuccess = function(data) {
    return {
        type: USER_LOGOUT_SUCCESS
    };
};

const USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR';
const userLogoutError = function(error) {
    return {
        type: USER_LOGOUT_ERROR,
        error: error
    };
};

exports.userLogout = userLogout;
exports.USER_LOGOUT_SUCCESS = USER_LOGOUT_SUCCESS;
exports.userLogoutSuccess = userLogoutSuccess;
exports.USER_LOGOUT_ERROR = USER_LOGOUT_ERROR;
exports.userLogoutError = userLogoutError;

const getUser = function() {
    return function(dispatch) {
        const url = '/api/user';
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },    
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            return dispatch(getUserSuccess(data));
        }).catch(function(error) {
            return dispatch(getUserError(error));
        });
    }
};

const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const getUserSuccess = function(data) {
    return {
        type: GET_USER_SUCCESS,
        data: data
    };
};

const GET_USER_ERROR = 'GET_USER_ERROR';
const getUserError = function(error) {
    return {
        type: GET_USER_ERROR,
        error: error
    };
};

exports.getUser = getUser;
exports.GET_USER_SUCCESS = GET_USER_SUCCESS;
exports.getUserSuccess = getUserSuccess;
exports.GET_USER_ERROR = GET_USER_ERROR;
exports.getUserError = getUserError;

const updateUser = function(_new, _old) {
    let payload = {};
    let vaildKeys = ['email', 'firstname', 'lastname'];

    for (let i = 0; i < vaildKeys.length; i++) {
        if (_new[vaildKeys[i]] != _old[vaildKeys[i]]) {
            payload[vaildKeys[i]] = _new[vaildKeys[i]];
        }
    }

    let url = '/api/user';
    return function(dispatch) {
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
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            return dispatch(updateUserSuccess(data));
        }).catch(function(error) {
            return dispatch(updateUserError(error));
        });
    }
};

const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const updateUserSuccess = function(data) {
    return {
        type: UPDATE_USER_SUCCESS,
        data: data
    };
};

const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
const updateUserError = function(error) {
    return {
        type: UPDATE_USER_ERROR,
        error: error
    };
};

exports.updateUser = updateUser;
exports.UPDATE_USER_SUCCESS = UPDATE_USER_SUCCESS;
exports.updateUserSuccess = updateUserSuccess;
exports.UPDATE_USER_ERROR = UPDATE_USER_ERROR;
exports.updateUserError = updateUserError;

const updateUserPassword = function(oldpassword, newpassword, callback) {
    let payload = {
        oldpassword: oldpassword,
        newpassword: newpassword
    };

    let url = '/api/user/login';
    return function(dispatch) {
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
        }).then(function() {
            callback(true);
            return dispatch(updateUserPasswordSuccess());
        }).catch(function(error) {
            callback(false);
            return dispatch(updateUserPasswordError(error));
        });
    }
};

const UPDATE_USER_PASSWORD_SUCCESS = 'UPDATE_USER_PASSWORD_SUCCESS';
const updateUserPasswordSuccess = function() {
    return {
        type: UPDATE_USER_PASSWORD_SUCCESS,
    };
};

const UPDATE_USER_PASSWORD_ERROR = 'UPDATE_USER_PASSWORD_ERROR';
const updateUserPasswordError = function(error) {
    return {
        type: UPDATE_USER_PASSWORD_ERROR,
        error: error
    };
};

exports.updateUserPassword = updateUserPassword;
exports.UPDATE_USER_PASSWORD_SUCCESS = UPDATE_USER_PASSWORD_SUCCESS;
exports.updateUserPasswordSuccess = updateUserPasswordSuccess;
exports.UPDATE_USER_PASSWORD_ERROR = UPDATE_USER_PASSWORD_ERROR;
exports.updateUserPasswordError = updateUserPasswordError;





const ADD_ADMIN = 'ADD_ADMIN';
const addAdmin = function(username, password) {
    const payload = {
        username: username,
        password: password,
    };
    return function(dispatch) {
        const url = '/admin.php';
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
            return dispatch(addAdminSuccess(response));
        })
        .catch(function(error) {
            return dispatch(addAdminError(error));
        });
    };
};

const ADD_ADMIN_SUCCESS = "ADD_ADMIN_SUCCESS";
const addAdminSuccess = function(data) {
    return {
        type: ADD_ADMIN_SUCCESS,
        data: data,
    };
};

const ADD_ADMIN_ERROR = 'ADD_ADMIN_ERROR';
const addAdminError = function(error) {
    return {
        type: ADD_ADMIN_ERROR,
        error: error,
    };
};

exports.addAdmin = addAdmin;
exports.ADD_ADMIN_SUCCESS = ADD_ADMIN_SUCCESS;
exports.addAdminSuccess = addAdminSuccess;
exports.ADD_ADMIN_ERROR = ADD_ADMIN_ERROR;
exports.addAdminError = addAdminError;