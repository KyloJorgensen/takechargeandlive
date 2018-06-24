'use strict';

import { connect } from 'react-redux';
import ShopItemEdit from './shop-item-edit.component.js';

var mapStateToProps = function(state, props) {
	console.log('map to props', state.shop.shopItemList, props.match);
	let _shopItemId = props.match.params._shopItemId;
	let shopItemList = state.shop.shopItemList || {};
	let shopItem = shopItemList[_shopItemId] || {};

	let _props = {_shopItemId: _shopItemId};
	_props.name = shopItem.name || '';
	_props.price = shopItem.price || '';
	console.log(_props);
	return {
		_shopItemId: _shopItemId,
		name: _props.name,
		price: _props.price,
    	adminAccess: state.user.adminAccess,
	};
};

var Container = connect(mapStateToProps)(ShopItemEdit);

export default Container;