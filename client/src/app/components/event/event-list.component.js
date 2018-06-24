'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import eventActions from '../../actions/event.actions.js';
import EventListItem from './event-list-item.container.js';

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	let query = false;
    	if (this.props.limit) {
            query = {};
    		query.limit = this.props.limit;
    	}
    	this.props.dispatch(eventActions.getEventItems(query));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    	let update = false;
    	let prevDiscontinued = prevProps.discontinued || false;
    	let currentDiscontinued = this.props.discontinued || false;

    	if (prevDiscontinued != currentDiscontinued) {
	    	update = true;
    	}

    	if (update) {
    		let query = {
    			discontinued: this.props.discontinued || false,
    			limit: this.props.limit || 10,
    		}
    		this.props.dispatch(eventActions.getEventItems(query));
    	}

    }

	render() {
		let EventItemList = [];
		if (this.props.eventItemsDisplay) {
            let displayDetails = true;
            if ('displayDetails' in this.props) {
                displayDetails = this.props.displayDetails;
            }
            this.props.eventItemsDisplay.forEach(function(eventItemKey) {
				EventItemList.push(<EventListItem key={eventItemKey} _eventItemId={eventItemKey} displayDetails={displayDetails} />)
			});
		}
		return (
			<div className="event-list-wrapper" >
				{this.props.adminAccess ? (
					<div>
						<Link to="/event/newitem">NEW EVENT</Link>
						<br/>
					</div>
				) : ''}
				<ul className='event-item-list' >
					{EventItemList}
				</ul>
			</div>
		);			
	}
};

export default EventList;