'use strict';

import { connect } from 'react-redux';
import HomeEvent from './home-event.component.js';

var mapStateToProps = function(state, props) {
    return {
    	eventItemsDisplay: state.event.eventItemsDisplay,
    	eventItemList: state.event.eventItemList,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(HomeEvent);

export default Container;