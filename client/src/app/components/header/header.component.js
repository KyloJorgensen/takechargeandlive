'use strict';

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import userActions from '../../actions/user.actions.js';
import Dropdown from '../utilities/dropdown.component.js';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheckSquare from '@fortawesome/fontawesome-free-solid/faCheckSquare';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import faUserAlt from '@fortawesome/fontawesome-free-solid/faUserAlt';

fontawesome.library.add(faCheckSquare, faSignInAlt, faSignOutAlt, faUserAlt);



import './header.less';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
  			navPosition: 'initial',
  			logoMargin: 0,
  		};
  		this.logout = this.logout.bind(this);
  		this.handleScroll = this.handleScroll.bind(this);
    }

	componentDidMount() {
	    window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
	    window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(e) {
		var _state = this.state;
		var scroll = window.pageYOffset;
		var imgHeight = this.refs["logo"].clientHeight;
		var navBarHeight = this.refs["nav"].clientHeight;
		var navBarWidth = this.refs["nav"].clientWidth;
		_state.navPosition = scroll >= imgHeight && navBarWidth > 900 ? 'fixed' : 'initial';
		_state.logoMargin = scroll >= imgHeight && navBarWidth > 900 ? navBarHeight+20 : 0;
		this.setState(_state);
	}

	logout() {
		this.props.dispatch(userActions.userLogout());
	}

	render() {
		const { show } = this.state;

		let user = []

		let selectedAdmin = ['/image'];
		let adminClasses = "btn dropdown-toggle";
		if (selectedAdmin.includes(this.props.location.pathname)) {
			adminClasses += " selected ";
		}

		let admin = this.props.adminAccess ? (
			<Dropdown key="admin" toggleClass={adminClasses} menuClass="dropdown-menu-right" toggleChild='ADMIN'>
				<NavLink exact className="dropdown-item" role="menuitem" tabIndex="-1" to={'/image'} activeClassName="selected" >IMAGES</NavLink>
			</Dropdown>
		) : ''; 
		user.push(admin);

		let selectedProfile = ['/profile'];
		let profileClasses = "btn dropdown-toggle";
		if (selectedProfile.includes(this.props.location.pathname)) {
			profileClasses += " selected ";
		}

		let profile = this.props.userAccess ? (
			<NavLink exact key="profile" className="btn mytooltip" role="menuitem" tabIndex="-1" to={'/profile'} activeClassName="selected" >
				<FontAwesomeIcon icon={["fas", "user-alt"]} />
				<span className="btn mytooltiptext">PROFILE</span>
			</NavLink>
		) : ''; 
		user.push(profile);

		let logInOut = this.props.userAccess ? (
			<a key="logout" className="btn mytooltip" onClick={this.logout} >
				<FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
 				<span className="btn mytooltiptext">SIGN OUT</span>
			</a>
		) : (
			<NavLink exact key="login" className="btn mytooltip" role="menuitem" tabIndex="-1" to={{
				pathname: '/login', 
				state: {
					redirectPath: this.props.location.pathname
				}
			}} activeClassName="selected" >
				<FontAwesomeIcon icon={["fas", "sign-in-alt"]} />
 				<span className="btn mytooltiptext">SIGN IN</span>
 			</NavLink>
		); 
		user.push(logInOut);
		let selectedCommunity = ['/soundboard', '/news', '/event'];
		let communityClasses = "btn dropdown-toggle";
		if (selectedCommunity.includes(this.props.location.pathname)) {
			communityClasses += " selected ";
		}
		return (
			<header onScroll={this.handleScroll}>
				<div className="container" >
					<div className="logo" ref="logo" style={{marginBottom: this.state.logoMargin+'px'}}>
						<NavLink role="menuitem" tabIndex="-1" to={'/'} ><img className="logo-img" src="/images/pencil4lifelogo-blue-transparent.png" alt="Pencil4Life" /></NavLink>
					</div>
				</div>
				<div className="container nav-wrapper" ref="nav" style={{position: this.state.navPosition}} >
				    <nav >
				    	<NavLink exact className="btn" role="menuitem" tabIndex="-1" to={'/'} activeClassName="selected" >HOME</NavLink>
				    	<NavLink exact className="btn" role="menuitem" tabIndex="-1" to={'/project'} activeClassName="selected" >PROJECTS</NavLink>
				    	<NavLink exact className="btn" role="menuitem" tabIndex="-1" to={'/doodles'} activeClassName="selected" >DOODLES</NavLink>
				    	<NavLink exact className="btn" role="menuitem" tabIndex="-1" to={'/comics'} activeClassName="selected" >COMICS</NavLink>
				    	<Dropdown toggleClass={communityClasses}  toggleChild='COMMUNITY'>
				    		<NavLink className="dropdown-item" exact className="btn" role="menuitem" tabIndex="-1" to={'/event'} activeClassName="selected" >EVENTS</NavLink>
						    <NavLink className="dropdown-item" exact className="btn" role="menuitem" tabIndex="-1" to={'/news'} activeClassName="selected" >NEWS</NavLink>
						    <NavLink className="dropdown-item" exact className="btn" role="menuitem" tabIndex="-1" to={'/soundboard'} activeClassName="selected" >SOUNDBOARD</NavLink>
				    	</Dropdown>
					    <NavLink exact className="btn" role="menuitem" tabIndex="-1" to={'/shop'} activeClassName="selected" >SHOP</NavLink>
				    	<NavLink exact className="btn" role="menuitem" tabIndex="-1" to={'/commission'} activeClassName="selected" >COMMISSION</NavLink>
				    	<NavLink exact className="btn" role="menuitem" tabIndex="-1" to={'/info'} activeClassName="selected" >INFO</NavLink>
				    	<NavLink exact className="btn" role="menuitem" tabIndex="-1" to={'/contact'} activeClassName="selected" >CONTACT</NavLink>
				    </nav>
					<div className="user-info" >
						{user}
					</div>
				</div>
			</header>
		);
	}
};

export default Header;