'use strict';

import { connect } from 'react-redux';
import NewsSwitch from './news-switch.component.js';

var mapStateToProps = function(state, props) {
    return {
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(NewsSwitch);

export default Container;