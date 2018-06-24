'use strict';

import actions from '../actions/user.actions';

const userInitialState = {
    access: false,
    email: '',
    firstname: '',
    lastname: '',
    adminAccess: '',
};

function setUser(_state, action) {
    _state.access = true;
    if (action.data.email) {_state.email = action.data.email;}
    if (action.data.firstname) {_state.firstname = action.data.firstname;}
    if (action.data.lastname) {_state.lastname = action.data.lastname;}
    if (action.data.admin) {_state.adminAccess = action.data.admin;}
    return _state;
}

function unsetUser(_state) {
    _state.access = false;
    _state.email = '';
    _state.firstname = '';
    _state.lastname = '';
    _state.adminAccess = false;
    return _state;
}

const userReducer = function(state, action) {
    state = state || userInitialState;
    let _state = state;
    if (action.type === actions.USER_LOGIN_SUCCESS) {
        _state = setUser(_state, action);
    }    
    if (action.type === actions.USER_LOGIN_ERROR) {
    	console.log(action.error);
        _state = unsetUser(_state);
    }
    if (action.type === actions.USER_LOGOUT_SUCCESS) {
        _state = unsetUser(_state);
    }
    if (action.type === actions.USER_LOGOUT_ERROR) {
        console.log(action.error);
        _state = unsetUser(_state);
    }
    if (action.type ===  actions.GET_USER_SUCCESS) {
        _state = setUser(_state, action);
    }
    if (action.type ===  actions.GET_USER_ERROR) {
        console.log(action.error);
        _state = unsetUser(_state);
    }
    if (action.type ===  actions.UPDATE_USER_SUCCESS) {
        _state = setUser(_state, action);
    }
    if (action.type ===  actions.UPDATE_USER_ERROR) {
        console.log(action.error);
        _state = unsetUser(_state);
    }
    if (action.type === actions.ADD_ADMIN_SUCCESS) {
        console.log(action)
    }
    if (action.type === actions.ADD_ADMIN_ERROR) {
        console.log(action)
    }
    return _state;
};

export default userReducer;