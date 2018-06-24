'use strict';

import React, { Component } from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
			show: false,
			over: true,
  		};
  		this.dropDownToggle = this.dropDownToggle.bind(this);
  		this.click = this.click.bind(this);
  		this.onMouseEnter = this.onMouseEnter.bind(this);
  		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onClick = this.onClick.bind(this);
    }

	componentDidMount() {
		// event to hide dropdown list
	    window.addEventListener('click', this.click);
	}

	componentWillUnmount() {
		// remove eventlisters
	    window.removeEventListener('click', this.click);
	}

	click(e) {
		if (!this.state.over) {
			var _state = this.state;
			_state.show = false;
			this.setState(_state);
		}
	}

	dropDownToggle(e) {
		e.preventDefault();
		var _state = this.state;
		if (this.state.show == false) {
			_state.show = true;
		} else {
			_state.show = false;
		}
		this.setState(_state);
	}

	onMouseEnter () {
		var _state = this.state;
		_state.over = true;
		this.setState(_state);
	}

	onMouseMove() {
		var _state = this.state;
		_state.over = true;
		this.setState(_state);
	}

	onMouseLeave() {
		var _state = this.state;
		_state.over = false;
		this.setState(_state);
	}

	onClick() {
		var _state = this.state;
		_state.over = false;
		_state.show = false;
		this.setState(_state);
	}

	render() {
		const { show } = this.state;
		const { toggleClass, menuClass, toggleChild, children } = this.props;
 		
		let _toggleClass, _menuClass, _toggleChild, _children;

		_toggleClass = !!toggleClass ? toggleClass : 'btn dropdown-toggle';
		_menuClass = !!menuClass ? menuClass : 'dropdown-menu';
		_toggleChild = !!toggleChild ? toggleChild : 'Menu';
		_children = !!children ? children : [
			(<a key='1' className='dropdown-item' href="">Item 1</a>),
			(<a key='2' className='dropdown-item' href="">Item 2</a>),
			(<a key='3' className='dropdown-item' href="">Item 3</a>),
		];

		if (show) {
			_menuClass += ' show ';
		} else {
			_menuClass = _menuClass.replace('show','');
		}

		return (
			<div className="dropdown show" onMouseLeave={this.onMouseLeave} onMouseMove={this.onMouseMove} onMouseEnter={this.onMouseEnter} >
				<a className={_toggleClass} href="" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.dropDownToggle} >
					{_toggleChild}
				</a>

				<div className={_menuClass} aria-labelledby="dropdownMenuLink" onClick={this.onClick} >
					{_children}
				</div>
			</div>
		);
	}
};

export default Dropdown;