'use strict';

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import { Link } from 'react-router-dom';
import moment from 'moment';
import eventActions from '../../actions/event.actions.js';

class EventListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(eventActions.getEventItem(this.props._eventItemId));
    }

	render() {
		let itemList = [];
		let startDateTime = moment(this.props.start_date);
		let endDateTime = moment(this.props.end_date);

		let startDay = startDateTime.calendar(null, {
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			nextWeek: 'dddd',
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd',
			sameElse: 'MM/DD/YYYY',
		});

		let endDay = endDateTime.calendar(null, {
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			nextWeek: 'dddd',
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd',
			sameElse: 'MM/DD/YYYY',
		});

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


		let content = '<h5>' + this.props.title + '</h5>' + '<p className="event-date-time">' + dateTime + '</p>' + (this.props.displayDetails ? this.props.details : '');

		let createdDetails = this.props.displayDetails ? (<p className='event-created-updated-date-time' >{this.props.createdUpdatedDateTime}</p>) : '';

		return (
			<div className="event-list-item-wrapper" >				
				<Link className="event-link" to={'/event/item/'+this.props._eventItemId} >
					<RichTextEditor value={RichTextEditor.createValueFromString(content, 'html')} readOnly={true} />	
				</Link>
				{createdDetails}
			</div>
		);		
	}
};

export default EventListItem;