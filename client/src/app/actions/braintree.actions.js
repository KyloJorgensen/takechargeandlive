'use strict';

import fetch from 'isomorphic-fetch';
import dropin from 'braintree-web-drop-in';

const getClientToken = function() {
    return function(dispatch) {
        const url = '/api/checkout/new';
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',  
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
        .then(function(data) {
            return dispatch(getClientTokenSuccess(data));
        })
        .catch(function(error) {
            return dispatch(getClientTokenError(error));
        });
    }
};

const GET_CLIENT_TOKEN_SUCCESS = 'GET_CLIENT_TOKEN_SUCCESS';
const getClientTokenSuccess = function(response) {
    return {
        type: GET_CLIENT_TOKEN_SUCCESS,
        clientToken: response.clientToken
    };
};

const GET_CLIENT_TOKEN_ERROR = 'GET_CLIENT_TOKEN_ERROR';
const getClientTokenError = function(error) {
    return {
        type: GET_CLIENT_TOKEN_ERROR,
        error: error
    };
};

exports.getClientToken = getClientToken;
exports.GET_CLIENT_TOKEN_SUCCESS = GET_CLIENT_TOKEN_SUCCESS;
exports.getClientTokenSuccess = getClientTokenSuccess;
exports.GET_CLIENT_TOKEN_ERROR = GET_CLIENT_TOKEN_ERROR;
exports.getClientTokenError = getClientTokenError;

const createDropIn = function(clientToken) {
    return function(dispatch) {
        dropin.create({
            authorization: clientToken,
            container: '#dropin-container',
            card: {
                cardholderName: {
                    required: true,
                },
            },
            paypal: {
                flow: 'checkout',
                amount: '10.00',
                currency: 'USD',
                commit: false,
            },
            paypalCredit: {
                flow: 'chechout',
                amount: '10.00',
                currency: 'USD',
                commit: false,
            },
        }, function(dropInErr, dropInInstance) {
            if (dropInErr) {
                return dispatch(createDropInError(dropInErr));
            }
            return dispatch(createDropInSuccess(dropInInstance));
        });
    }
};

const CREATE_DROP_IN_SUCCESS = 'CREATE_DROP_IN_SUCCESS';
const createDropInSuccess = function(dropInInstance) {
    return function(dispatch) {
        const submitButton = document.querySelector('#submit-button');
        dropInInstance.on('paymentMethodRequestable', function(event) {
            console.log(event.type); // The type of Payment Method, e.g 'CreditCard', 'PayPalAccount'.
            console.log(event.paymentMethodIsSelected); // true if a customer has selected a payment method when paymentMethodRequestable fires

            // submitButton.removeAttribute('disabled');
            dispatch(setSubmitButtonDisabled(false));
        });

        dropInInstance.on('noPaymentMethodRequestable', function() {
            // submitButton.setAttribute('disabled', true);
            dispatch(setSubmitButtonDisabled(true));
        });

        return dispatch(setDropInInstance(dropInInstance));
    }
};

const setDropInInstance = function(dropInInstance) {
    return {
        type: CREATE_DROP_IN_SUCCESS,
        dropInInstance: dropInInstance
    };
};

const CREATE_DROP_IN_ERROR = 'CREATE_DROP_IN_ERROR';
const createDropInError = function(dropInErr) {
    return {
        type: CREATE_DROP_IN_ERROR,
        dropInErr: dropInErr
    };
};

exports.createDropIn = createDropIn;
exports.CREATE_DROP_IN_SUCCESS = CREATE_DROP_IN_SUCCESS;
exports.createDropInSuccess = createDropInSuccess;
exports.CREATE_DROP_IN_ERROR = CREATE_DROP_IN_ERROR;
exports.createDropInError = createDropInError;


const SET_SUBMIT_BUTTON_DISABLED = 'SET_SUBMIT_BUTTON_DISABLED';
const setSubmitButtonDisabled = function(submitButtonDisabled) {
    return {
        type: SET_SUBMIT_BUTTON_DISABLED,
        submitButtonDisabled: submitButtonDisabled,
    };
};

exports.SET_SUBMIT_BUTTON_DISABLED = SET_SUBMIT_BUTTON_DISABLED;
exports.setSubmitButtonDisabled = setSubmitButtonDisabled;

const postSale = function(payment_method_nonce) {
    let payload = {};
    payload.payment_method_nonce = payment_method_nonce;
    payload.amount = '10.00';    
    return function(dispatch) {
        const url = '/api/checkout/';
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
        .then(function(data) {
            return dispatch(postSaleSuccess(data));
        })
        .catch(function(error) {
            return dispatch(postSaleError(error));
        });
    }
};

const POST_SALE_SUCCESS = 'POST_SALE_SUCCESS';
const postSaleSuccess = function(response) {
    console.log(response);
    return {
        type: POST_SALE_SUCCESS,
    };
};

const POST_SALE_ERROR = 'POST_SALE_ERROR';
const postSaleError = function(error) {
    console.log(error);
    return {
        type: POST_SALE_ERROR,
    };
};

exports.postSale = postSale;
exports.POST_SALE_SUCCESS = POST_SALE_SUCCESS;
exports.postSaleSuccess = postSaleSuccess;
exports.POST_SALE_ERROR = POST_SALE_ERROR;
exports.postSaleError = postSaleError;