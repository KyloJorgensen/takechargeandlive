'use strict';

import React, { Component } from 'react';
import EventList from './event-list.container.js';

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	discontinued: false,
        };

		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(e) {
        let _state = this.state;
        _state[e.target.name] = e.target.checked;
        this.setState(_state);
    }

	render() {
        let adminOptions = this.props.adminAccess ? (
            <div>
                <h5>Admin Options</h5>
                <label>Discontinued</label><input type='checkbox' checked={!!this.state.discontinued} name="discontinued" onChange={this.handleCheckboxChange} />
            </div>
        ) : '';

        return (
			<div className="event-wrapper" >
                {adminOptions}
				<EventList discontinued={this.state.discontinued} />
			</div>
		);			
	}
};

export default EventPage;