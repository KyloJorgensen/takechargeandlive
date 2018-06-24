'use strict';

import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import userActions from '../../actions/user.actions';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	passwordMismtach: false,
        	passwordBad: false,
        };

		this.hitKey = this.hitKey.bind(this);
		this.updateUserPassword = this.updateUserPassword.bind(this);
		this.updateUserPasswordResult = this.updateUserPasswordResult.bind(this);
		this.redirect = this.redirect.bind(this);
    }

    componentWillUnmount() {
    	if ('oldpassword' in this.refs) {
    		this.refs.oldpassword.value = '';
    	}
    	if ('newpassword'in this.refs) {
    		this.refs.newpassword.value = '';
    	}
    	if ('confirmpassword'in this.refs) {
    		this.refs.confirmpassword.value = '';
    	}
	}

	hitKey(event) {
		if (event.key == 'Enter') {
            this.updateUserPassword();
        }
	}

    updateUserPassword(e) {
		e.preventDefault();
		console.log('here')
		let oldpassword = this.refs.oldpassword.value;
		let newpassword = this.refs.newpassword.value;
		let confirmpassword = this.refs.confirmpassword.value;
		if (!oldpassword) {
			let _state = this.state;
			_state.passwordBad = true;
			this.setState(_state);
			return;
		}

		if (newpassword == confirmpassword) {
			this.props.dispatch(userActions.updateUserPassword(oldpassword, newpassword, this.updateUserPasswordResult));
			let _state = this.state;
			_state.passwordMismtach = false;
			_state.passwordBad = false;
			this.setState(_state);
		} else {
			this.refs.oldpassword.value = '';
			this.refs.newpassword.value = '';
			this.refs.confirmpassword.value = '';

			let _state = this.state;
			_state.passwordMismtach = true;
			this.setState(_state);
		}
    }

    updateUserPasswordResult(success) {
    	if (success) {
			this.redirect();
    	} else {
			this.refs.oldpassword.value = '';
			this.refs.newpassword.value = '';
			this.refs.confirmpassword.value = '';
			let _state = this.state;
			_state.passwordMismtach = true;
			_state.passwordBad = true;
			this.setState(_state);
    	} 
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
				<form onSubmit={this.updateUserPassword}>
					<label>Old Password{this.state.passwordBad ? (<span className="errortext" >* Bad Password</span>) : ''}</label>
					<br/>
					<input type='password' onKeyPress={this.hitkey} placeholder="Old Password" ref='oldpassword' />
					<br/>
					<label>New Password{this.state.passwordMismtach ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<input type='password' onKeyPress={this.hitkey} placeholder="New Password" ref='newpassword' />
					<br/>
					<label>Confrim New Password{this.state.passwordMismtach ? (<span className="errortext" >* Must match new Password</span>) : ''}</label>
					<br/>
					<input type='password' onKeyPress={this.hitkey} placeholder="New Password" ref='confirmpassword' />
					<br/>
					<input type='submit' onClick={this.updateUserPassword} value='SAVE' />
				</form>	
			</div>
		);			
	}
};

export default Profile;