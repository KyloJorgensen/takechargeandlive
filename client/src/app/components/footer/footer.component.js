'use strict';

import React, { Component } from 'react';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import './footer.less'; 

fontawesome.library.add(brands);

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
  			show: false,
  			over: false,
  		};

		this.popUpToggle= () => {
			var _state = this.state;
			_state.show = this.state.show == false ? true : false;
			this.setState(_state);
		};
  		this.click = () => {
			if (!this.state.over) {
				var _state = this.state;
				_state.show = false;
				this.setState(_state);
			}
		};
	  	this.onMouseEnter = () => {
			var _state = this.state;
			_state.over = true;
			this.setState(_state);
		};
  		this.onMouseLeave = () => {
			var _state = this.state;
			_state.over = false;
			this.setState(_state);
		};
		this.onMouseMove = () => {
			var _state = this.state;
			_state.over = true;
			this.setState(_state);
		};
		this.onClick = () => {
			var _state = this.state;
			_state.over = false;
			_state.show = false;
			this.setState(_state);
		};
    }


	componentDidMount() {
	    window.addEventListener('scroll', this.click);
	    window.addEventListener('click', this.click);
	}

	componentWillUnmount() {
	    window.removeEventListener('scroll', this.click);
	    window.removeEventListener('click', this.click);
	}

	render() {
		let footerBodyClass = this.state.show ? 'footer-body fixed' : 'footer-body';
		let BodyFillerClass = this.state.show ? 'container' : 'hide';

		return (
			<footer ref={this.footer} id="footer" >
		    	<div className={footerBodyClass} onMouseLeave={this.onMouseLeave} onMouseMove={this.onMouseMove} onMouseEnter={this.onMouseEnter} onClick={this.onClick} >
			    	<div className="container" >
			    		<a href="https://www.instagram.com/pencil.4.life/"><FontAwesomeIcon icon={["fab", "instagram"]} /></a>
			    		<a href="https://www.twitch.tv/pencil4life"><FontAwesomeIcon icon={["fab", "twitch"]} /></a>
			    		<a href="https://twitter.com/pencil4life"><FontAwesomeIcon icon={["fab", "twitter"]} /></a>
			    		<a href="https://www.facebook.com/pencil4life/?ref=br_rs"><FontAwesomeIcon icon={["fab", "facebook-f"]} /></a>

			    		{/*<a className="button alt" onClick={this.login} >ADMIN</a>*/}
			    	</div>
			    	<div className="legal container">
			    		<a href="">&copy;Pencil4Life</a>
			    		<a href="">&copy;Brad Ashworth</a>
			    		<a href="">&copy;Kylo Jorgensen</a>
			    		<a href="">Privacy Policy</a>
			    		<a href="">User Agreement</a>
			    	</div>
		    	</div>
		    		<div className={BodyFillerClass} >
			    		<a href="">This is the body filler</a>
			    	</div>
		    	<div className="footer-bar" onMouseMove={this.onMouseMove} onMouseEnter={this.onMouseEnter} onClick={this.popUpToggle} ></div>
	    	</footer>
		);
	}
};

export default Footer;