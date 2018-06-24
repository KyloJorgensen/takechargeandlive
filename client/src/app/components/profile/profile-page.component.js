'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import {Redirect} from "react-router-dom";
import Profile from './profile.container.js';
import ProfileEdit from './profile-edit.container.js';
import ProfileChangePassword from './profile-change-password.container.js';
import NoMatch from '../no-match.component.js';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

	render() {
		if (!this.props.userAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: '/profile'}}}/>);
		}

		return (
			<div className="profile-page-wrapper">
				<div className="container">
                    <Switch>
                    	<Route exact path="/profile" component={Profile} />
                        <Route path="/profile/edit" component={ProfileEdit} />
                        <Route path="/profile/changepassword" component={ProfileChangePassword} />
                        <Route component={NoMatch}/>
                    </Switch>
				</div>
			</div>
		);			
	}
};

export default ProfilePage;