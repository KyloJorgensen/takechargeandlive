'use strict';

import React, { Component } from 'react';
import braintree from 'braintree-web';
import dropin from 'braintree-web-drop-in';
import braintreeActions from '../../actions/braintree.actions';

class BTdropin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropInErrorMessage: '',
        };
        this.requestPaymentMethod = this.requestPaymentMethod.bind(this);
        this.handleRequestPaymentMethod = this.handleRequestPaymentMethod.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(braintreeActions.createDropIn(this.props.clientToken));
    }

    requestPaymentMethod(e) {
        if (this.props.dropInInstance) {            
            this.props.dropInInstance.requestPaymentMethod(this.handleRequestPaymentMethod);
        } else {
            console.log("This instance is: ", this.props.dropInInstance);
        }
    }

    handleRequestPaymentMethod(requestPaymentMethodErr, payload) {
        if (requestPaymentMethodErr) {
            console.log(requestPaymentMethodErr);
            if (requestPaymentMethodErr.name == 'DropinError') {
                var _state = this.state || {};
                _state.dropInErrorMessage = 'Please select a payment type.';
                this.setState(_state);
            }
            return;
        }
        // Submit payload.nonce to your server
        console.log("success", payload);
        this.props.dispatch(braintreeActions.postSale(payload.nonce));
    }

    render() {
        console.log(this.state, this.props.submitButtonDisabled);

        var dropInError = this.state.dropInErrorMessage ? (
                <div className="errormMessage" >{this.state.dropInErrorMessage}</div>
            ) : '';
        var submitButton = this.props.submitButtonDisabled ? (
                <button id="submit-button" disabled onClick={ this.requestPaymentMethod } > Continue </button> 

            ) : (
                <button id="submit-button" onClick={ this.requestPaymentMethod } > Continue </button> 
            );


        return ( 
            <div className = "btdropin-wrapper" >
                <div id="dropin-container" />
                {dropInError}
                {submitButton}
            </div>
        );
    }
};

export default BTdropin;