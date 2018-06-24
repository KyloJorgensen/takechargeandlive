'use strict';

import React, { Component } from 'react';
import userActions from '../../actions/user.actions';
import objectPath from 'object-path';

import {Redirect} from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	badAuth: false,
        };

		this.hitKey = this.hitKey.bind(this);
		this.login = this.login.bind(this);
		this.loginResult = this.loginResult.bind(this);
    }

	componentWillUnmount() {
		if ('email' in this.refs) {
			this.refs.email.value = '';
		}
    	if ('password' in this.refs) {
    		this.refs.password.value = '';
    	}
	}

	hitKey(event) {
		if (event.key == 'Enter') {
            this.login(event);
        }
	}

	login(event) {
		event.preventDefault();
		let email, password;
		let invalid = null;
		// Validate email
		if (this.refs.email.value) {
			email = this.refs.email.value;
		} else {
			invalid = invalid || {};
			invalid.email = {
				message: "Email is Required"
			}
		}
		// Validate password
		if (this.refs.password.value){
			password = this.refs.password.value;
		} else {
			invalid = invalid || {};
			invalid.password = {
				message: "Password is Required"
			}
		}

		if (invalid) {
			this.refs.email.value = '';
			this.refs.password.value = '';
			let _state = this.state;
			_state.badAuth = true;
			this.setState(_state);
			console.log(invalid);
			return;
		}
		
		// Login in with vaildated email and password

		this.props.dispatch(userActions.userLogin(email, password, this.loginResult));
		let _state = this.state;
		_state.badAuth = true;
		this.setState(_state);
	}

	loginResult(result) {
    	if (!result) {
			this.refs.email.value = '';
			this.refs.password.value = '';
			let _state = this.state;
			_state.badAuth = true;
			this.setState(_state);
    	} 
	}

	render() {
		if (this.props.userAccess || this.props.adminAccess) {
			if (objectPath.has(this, 'props.location.state.redirectPath')) {
				if (this.props.location.state.redirectPath) {
					return (<Redirect to={this.props.location.state.redirectPath} />);
				}
			}
			return (<Redirect to='/'/>);
		}

		return (
			<div className="login-page-wrapper">
				<div className="container">
					<form className="login-login-form" onSubmit={this.login} >
						<label>Login</label>
						<br/>
						<label htmlFor="email"><b>Email:</b></label>
						<br/>
    					<input type="text" onKeyPress={this.hitkey} placeholder="Enter youremail@example.com" name="email" ref="email" required />
    					{this.state.badAuth ? (<span className="errortext" >* Required</span>) : ''}
    					<br/>
    					<label htmlFor="password"><b>Password:</b></label>
						<br/>
    					<input type="password" onKeyPress={this.hitkey} placeholder="Enter Password" name="password" ref="password" required />
						{this.state.badAuth ? (<span className="errortext" >* Required</span>) : ''}
						<br/>
						<input type="submit" onClick={this.login} value="LOGIN"/>
					</form>
				</div>
			</div>
		);			
	}
};

export default LoginPage;