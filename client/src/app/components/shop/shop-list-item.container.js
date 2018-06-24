'use strict';

import { connect } from 'react-redux';
import ShopListItem from './shop-list-item.component.js';

var mapStateToProps = function(state, props) {
	let shopItemList = state.shop.shopItemList || {};
	let shopItem = shopItemList[props._shopItemId] || {name: '', price: ''};
    return {
    	name: shopItem.name,
    	price: shopItem.price,
    };
};

var Container = connect(mapStateToProps)(ShopListItem);

export default Container;