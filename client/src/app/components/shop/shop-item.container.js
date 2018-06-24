'use strict';

import { connect } from 'react-redux';
import ShopItem from './shop-item.component.js';

var mapStateToProps = function(state, props) {
	let _shopItemId = props.match.params._shopItemId;
	let shopItemList = state.shop.shopItemList || {};
	let shopItem = shopItemList[_shopItemId] || {};

	let _props = {
		_shopItemId: _shopItemId,
    	adminAccess: state.user.adminAccess,
	};
	_props.name = shopItem.name || '';
	_props.price = shopItem.price || '';
	return _props;
};

var Container = connect(mapStateToProps)(ShopItem);

export default Container;