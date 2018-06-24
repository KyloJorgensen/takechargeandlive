'use strict';

import { connect } from 'react-redux';
import ShopPage from './shop-page.component.js';

var mapStateToProps = function(state, props) {
    return {
    	shopItemsDisplay: state.shop.shopItemsDisplay,
    	shopItemList: state.shop.shopItemList,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(ShopPage);

export default Container;