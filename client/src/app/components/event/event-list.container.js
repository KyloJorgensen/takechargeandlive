'use strict';

import { connect } from 'react-redux';
import EventList from './event-list.component.js';

var mapStateToProps = function(state, props) {
    return {
    	eventItemsDisplay: state.event.eventItemsDisplay,
    	eventItemList: state.event.eventItemList,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(EventList);

export default Container;