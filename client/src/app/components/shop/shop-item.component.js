'use strict';

import React, { Component } from 'react';
import {Redirect, Link} from "react-router-dom";
import shopActions from '../../actions/shop.actions.js';

class ScheduleItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(shopActions.getShopItem(this.props._shopItemId));
    }

	render() {
		if (this.state.redirect) {
			return (<Redirect to='/shop'/>);
		}
		return (
			<div className="shop-item-wrapper" >
				<p>Name: {this.props.name}</p>
				<p>Price: {this.props.price}</p>
				{this.props.adminAccess ? <Link to={'/shop/edit/'+this.props._shopItemId}>EDIT</Link> : ''}
			</div>
		);			
	}
};

export default ScheduleItem;