'use strict';

import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import userActions from '../../actions/user.actions.js';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	email: null,
        	firstname: null,
        	lastname: null,
        };

		this.hitKey = this.hitKey.bind(this);
		this.editField = this.editField.bind(this);
		this.updateUser = this.updateUser.bind(this);
		this.redirect = this.redirect.bind(this);
    }

    componentWillMount() {
    	let _state = this.state;
    	_state.email = this.props.email;
    	_state.firstname = this.props.firstname;
    	_state.lastname = this.props.lastname;
        this.setState(_state);
    }

	hitKey(event) {
		if (event.key == 'Enter') {
            this.login();
        }
	}

    editField(e) {
        let _state = this.state;
        _state[e.target.name] = e.target.value;
        this.setState(_state);
    }

    updateUser(e) {
		e.preventDefault();
		this.props.dispatch(userActions.updateUser(this.state, this.props));
		this.redirect();
    }

	redirect() {
		let _state = this.state;
		_state.redirect = true;
		this.setState(_state);
	}

	render() {
		if (this.state.redirect) {
			return (<Redirect to='/profile'/>);
		}
		return (
			<div className="profile-wrapper" >
				<h1>Profile</h1>
				<form onSubmit={this.updateUser}>
					<label>Email</label>
					<br/>
					<input type='text' onKeyPress={this.hitkey} placeholder="joe.jones@example.com" onChange={this.editField} name='email' value={this.state.email} />
					<br/>
					<label>First Name</label>
					<br/>
					<input type='text' onKeyPress={this.hitkey} placeholder="Joe" onChange={this.editField} name='firstname' value={this.state.firstname} />
					<br/>
					<label>Last Name</label>
					<br/>
					<input type='text' onKeyPress={this.hitkey} placeholder="Jones" onChange={this.editField} name='lastname' value={this.state.lastname} />
					<br/>
					<input type='submit' onClick={this.updateUser} value='SAVE' />
				</form>	
			</div>
		);			
	}
};

export default Profile;