'use strict';

import React from 'react';
import BTDropin from './btdropin.container.js';
import braintreeActions from '../../actions/braintree.actions.js';

class ShopPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    	this.props.dispatch(braintreeActions.getClientToken());
    }

	render() {
		var btdropin = this.props.clientToken == null ? "this" : (<BTDropin clientToken={this.props.clientToken} />) ;
		return (
		    <div className="shop-page-wrapper" >
				<div className="container">
					<h1>Brad's Shop</h1>
					{btdropin}
				</div>
		    </div>
		);
	}
};

export default ShopPage;