'use strict';

import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import shopActions from '../../actions/shop.actions.js';

class ShopNewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	_shopItemId: false,
        	required: false,
        };

		this.hitKey = this.hitKey.bind(this);
		this.addNewShopItem = this.addNewShopItem.bind(this);
		this.addNewShopItemResult = this.addNewShopItemResult.bind(this);
		this.redirect = this.redirect.bind(this);
    }

    componentWillUnmount() {
    	if ('name' in this.refs) {
    		this.refs.name.value = '';
    	}
    	if ('price'in this.refs) {
    		this.refs.price.value = '';
    	}
	}

	hitKey(event) {
		if (event.key == 'Enter') {
            this.addNewShopItem();
        }
	}

    addNewShopItem(e) {
		e.preventDefault();
		let name = this.refs.name.value;
		let price = this.refs.price.value;
		if (!name || !price) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
			return;
		}
		this.props.dispatch(shopActions.addShopItem(name, price, this.addNewShopItemResult));
		let _state = this.state;
		_state.required = false;
		this.setState(_state);
    }

    addNewShopItemResult(error, _shopItemId) {
    	if (error) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
    	} else {
			let _state = this.state;
			_state._shopItemId = _shopItemId;
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
			return (<Redirect to='/shop' />);
		}
		if (this.state._shopItemId) {
			return (<Redirect to={'/shop/item/'+this.state._shopItemId} />);
		}
		if (!this.props.adminAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: this.props.location.pathname}}}/>)
		}
	
		return (
			<div className="shop-new-item-wrapper" >
				<form onSubmit={this.addNewShopItem}>
					<h3>New Item</h3>
					<label>Name{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<input type='text' onKeyPress={this.hitkey} placeholder="Big Pencils" ref='name' />
					<br/>
					<label>Price{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<input type='text' onKeyPress={this.hitkey} placeholder="$0.00" ref='price' />
					<br/>
					<input type='submit' onClick={this.addNewShopItem} value='SAVE' />
				</form>	
			</div>
		);			
	}
};

export default ShopNewItem;