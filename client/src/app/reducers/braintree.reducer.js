'use strict';

import actions from '../actions/braintree.actions';

const braintreeReducer = function(state, action) {
    const braintreeInitialState = {
        clientToken: null,
        dropInInstance: null,
        submitButtonDisabled: false,
    };
    state = state || braintreeInitialState;
    const _state = state;
    if (action.type === actions.GET_CLIENT_TOKEN_SUCCESS) {
        _state.clientToken = action.clientToken;
        _state.dropInInstance = null;
    }
    if (action.type === actions.GET_CLIENT_TOKEN_ERROR) {
        _state.clientToken = null;
        _state.dropInInstance = null;
        console.log(action.error);
    }
    if (action.type === actions.CREATE_DROP_IN_SUCCESS) {
        _state.dropInInstance = action.dropInInstance;
    }
    if (action.type === actions.CREATE_DROP_IN_ERROR) {
        _state.dropInInstance = null;
        console.log(action.createDropInErr);
    }
    if (action.type === actions.SET_SUBMIT_BUTTON_DISABLED) {
        console.log(action);
        _state.submitButtonDisabled = action.submitButtonDisabled;
    }
    return _state;
};

export default braintreeReducer;