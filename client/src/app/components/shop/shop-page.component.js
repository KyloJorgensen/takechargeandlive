'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shopActions from '../../actions/shop.actions.js';
import ShopListItem from './shop-list-item.container.js';

class ShopPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(shopActions.getShopItems());
    }

	render() {
		let ShopItemList = [];
		if (this.props.shopItemsDisplay) {
			this.props.shopItemsDisplay.forEach(function(shopItemKey) {
				ShopItemList.push(<ShopListItem key={shopItemKey} _shopItemId={shopItemKey}/>)
			});
		}
		console.log(this.props)
		return (
			<div className="shop-wrapper" >
				{this.props.adminAccess ? (
					<div>
						<Link to="/shop/newitem">NEW ITEM</Link>
						<br/>
					</div>
				) : ''}
				<ul className='shop-item-list' >
					{ShopItemList}
				</ul>
			</div>
		);			
	}
};

export default ShopPage;