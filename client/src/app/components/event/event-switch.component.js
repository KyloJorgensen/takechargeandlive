'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import {NavLink} from "react-router-dom";
import EventPage from './event-page.container.js';
import EventItem from './event-item.container.js';
import EventItemEdit from './event-item-edit.container.js';
import EventNewItem from './event-new-item.container.js';
import NoMatch from '../no-match.component.js';

class EventSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

	render() {
		return (
			<div className="event-page-wrapper">
				<div className="container">
					<NavLink exact to={'/event'} activeClassName="selected" ><h2>Events</h2></NavLink>
                    <Switch>
						<Route exact path="/event" component={EventPage} />
	                    <Route path="/event/newitem" component={EventNewItem} />
	                    <Route path="/event/item/:_eventItemId" component={EventItem} />
	                    <Route path="/event/edit/:_eventItemId" component={EventItemEdit} />
                        <Route component={NoMatch}/>
                    </Switch>
				</div>
			</div>
		);			
	}
};

export default EventSwitch;