'use strict';

import { connect } from 'react-redux';
import EventItemEdit from './event-item-edit.component.js';

var mapStateToProps = function(state, props) {
	console.log('map to props', state.event.eventItemList, props.match);
	let _eventItemId = props.match.params._eventItemId;
	let eventItemList = state.event.eventItemList || {};
	let eventItem = eventItemList[_eventItemId] || {};

	let _props = {_eventItemId: _eventItemId};
	_props.title = eventItem.title || '';
	_props.start_date = eventItem.start_date || '';
	_props.end_date = eventItem.end_date || '';
	_props.details = eventItem.details || '';
	_props.createdUpdatedDateTime = eventItem.createdUpdatedDateTime || '';
	_props.discontinued = eventItem.discontinued || false;
	console.log(_props);
	return {
		_eventItemId: _eventItemId,
		title: _props.title,
		start_date: _props.start_date,
		end_date: _props.end_date,
		details: _props.details,
		createdUpdatedDateTime: _props.createdUpdatedDateTime,
		discontinued: _props.discontinued,
    	adminAccess: state.user.adminAccess,
	};
};

var Container = connect(mapStateToProps)(EventItemEdit);

export default Container;