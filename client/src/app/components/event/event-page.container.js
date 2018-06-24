'use strict';

import { connect } from 'react-redux';
import EventPage from './event-page.component.js';

var mapStateToProps = function(state, props) {
    return {
    	eventItemsDisplay: state.event.eventItemsDisplay,
    	eventItemList: state.event.eventItemList,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(EventPage);

export default Container;