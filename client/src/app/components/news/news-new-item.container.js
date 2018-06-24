'use strict';

import { connect } from 'react-redux';
import NewsNewItem from './news-new-item.component.js';

var mapStateToProps = function(state, props) {
    return {
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(NewsNewItem);

export default Container;