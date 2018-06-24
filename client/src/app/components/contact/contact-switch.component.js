'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import {NavLink} from "react-router-dom";
import ContactPage from './contact-page.container.js';
import NoMatch from '../no-match.component.js';

class ContactSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

	render() {
		return (
			<div className="contact-switch-wrapper">
				<div className="container">
					<NavLink exact to={'/contact'} activeClassName="selected" ><h2>Contact</h2></NavLink>
                    <Switch>
						<Route exact path="/contact" component={ContactPage} />
                        <Route path="/contact/contact" component={NoMatch} />
                        <Route component={NoMatch}/>
                    </Switch>
				</div>
			</div>
		);			
	}
};

export default ContactSwitch;