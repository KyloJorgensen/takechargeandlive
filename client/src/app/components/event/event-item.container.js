'use strict';

import { connect } from 'react-redux';
import EventItem from './event-item.component.js';

var mapStateToProps = function(state, props) {
	let _eventItemId = props.match.params._eventItemId;
	let eventItemList = state.event.eventItemList || {};
	let eventItem = eventItemList[_eventItemId] || {};

	let _props = {
		_eventItemId: _eventItemId,
    	adminAccess: state.user.adminAccess,
    };
	_props.title = eventItem.title || '';
	_props.start_date = eventItem.start_date || '';
	_props.end_date = eventItem.end_date || '';
	_props.details = eventItem.details || '';
	_props.createdUpdatedDateTime = eventItem.createdUpdatedDateTime || '';
	return _props;
};

var Container = connect(mapStateToProps)(EventItem);

export default Container;