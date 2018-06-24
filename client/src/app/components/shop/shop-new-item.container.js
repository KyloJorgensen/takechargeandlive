'use strict';

import { connect } from 'react-redux';
import ShopNewItem from './shop-new-item.component.js';

var mapStateToProps = function(state, props) {
    return {
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(ShopNewItem);

export default Container;