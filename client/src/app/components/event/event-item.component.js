'use strict';

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import {Redirect, Link} from "react-router-dom";
import moment from 'moment';
import eventActions from '../../actions/event.actions.js';

class EventEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(eventActions.getEventItem(this.props._eventItemId));
    }

	render() {
		if (this.state.redirect) {
			return (<Redirect to='/event'/>);
		}

		let startDateTime = moment(this.props.start_date);
		let endDateTime = moment(this.props.end_date);

		let daymessage = {
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			nextWeek: 'dddd',
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd',
			sameElse: 'MM/DD/YYYY',
		};

		let startDay = startDateTime.calendar(null, daymessage);

		let endDay = endDateTime.calendar(null, daymessage);

		let startTime = startDateTime.format("h:mm a");
		let endTime = endDateTime.format("h:mm a");

		let dateTime = startDay + ' at ' + startTime;

		if (moment() >= startDateTime) {
			dateTime = 'Now';
		}

		if (startDay !== endDay) {
			dateTime += ' to ' + endDay + ' at ' + endTime;
		} else if (startTime !== endTime) {
			dateTime += ' until ' + endTime;
		}

		let content = '<h5>' + this.props.title + '</h5>' + '<p className="event-date-time">' + dateTime + '</p>' + this.props.details;

		return (
			<div className="event-item-wrapper" >
				{this.props.adminAccess ? <p className="text-right" ><Link to={'/event/edit/'+this.props._eventItemId}>EDIT</Link></p> : ''}
				<RichTextEditor value={RichTextEditor.createValueFromString(content, 'html')} readOnly={true} />
				<p className='news-created-updated-date-time' >{this.props.createdUpdatedDateTime}</p>
			</div>
		);			
	}
};

export default EventEdit;