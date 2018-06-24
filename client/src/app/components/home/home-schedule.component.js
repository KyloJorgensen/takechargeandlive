'use strict';

import React, { Component } from 'react';
import ScheduleList from '../../containers/schedule/schedule-list.container.js';

class HomeSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

	render() {
		return (
			<div className="schedule-wrapper col-md-4 p-2" >
                <h2>Schedule</h2>
				<ScheduleList />
			</div>
		);			
	}
};

export default HomeSchedule;