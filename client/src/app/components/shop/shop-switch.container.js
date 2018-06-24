'use strict';

import { connect } from 'react-redux';
import ShopSwitch from '../../components/shop/shop-switch.component';

var mapStateToProps = function(state, props) {
    return {
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(ShopSwitch);

export default Container;