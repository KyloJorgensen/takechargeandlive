'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userActions from '../../actions/user.actions.js';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};

  		this.logout = this.logout.bind(this);
    }
	
	logout() {
		this.props.dispatch(userActions.userLogout());
	}

	render() {
		return (
			<div className="profile-wrapper" >
				<h1>Profile</h1>
				<label>Email</label>
				<br/>
				<p>{this.props.email}</p>
				<br/>
				<label>First Name</label>
				<br/>
				<p>{this.props.firstname}</p>
				<br/>
				<label>Last Name</label>
				<br/>
				<p>{this.props.lastname}</p>
				<br/>
				<Link to="/profile/edit">EDIT</Link>
				<br/>			
				<Link to="/profile/changepassword">Change Password</Link>
				<br/>
                <a onClick={this.logout} >LOGOUT</a>		
			</div>
		);			
	}
};

export default Profile;