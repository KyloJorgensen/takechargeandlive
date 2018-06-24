'use strict';

import { connect } from 'react-redux';
import ShopPage from './shoppage.component.js';

var mapStateToProps = function(state, props) {
    return {
    	clientToken: state.braintree.clientToken,
    };
};

var Container = connect(mapStateToProps)(ShopPage);

export default Container;