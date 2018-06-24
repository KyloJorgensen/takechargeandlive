'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shopActions from '../../actions/shop.actions.js';

class ShopListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(shopActions.getShopItem(this.props._shopItemId));
    }

	render() {
		let itemList = [];

		return (
			<li className="shop-list-item-wrapper" >
				<Link to={'/shop/item/'+this.props._shopItemId} >
					<p>Name: {this.props.name}</p>
					<p>Price: {this.props.price}</p>
				</Link>
			</li>
		);			
	}
};

export default ShopListItem;