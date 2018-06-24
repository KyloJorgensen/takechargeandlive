'use strict';

import { connect } from 'react-redux';
import EventListItem from './event-list-item.component.js';

var mapStateToProps = function(state, props) {
	let eventItemList = state.event.eventItemList || {};
	let eventItem = eventItemList[props._eventItemId] || {title: '', start_date: '', end_date: '', details: '', createdUpdatedDateTime: ''};
    return {
    	title: eventItem.title,
    	start_date: eventItem.start_date,
    	end_date: eventItem.end_date,
    	details: eventItem.details,
        createdUpdatedDateTime: eventItem.createdUpdatedDateTime,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(EventListItem);

export default Container;