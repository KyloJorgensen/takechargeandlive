'use strict';

import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import shopActions from '../../actions/shop.actions';

class ShopItemEdit extends Component {
    constructor(props) {
    	console.log('constructor', props);
        super(props);
        this.state = {
        	redirect: false,
        	required: false,
        	name: null,
        	price: null,
        };

		this.hitKey = this.hitKey.bind(this);
		this.editField = this.editField.bind(this);
		this.updateShopItem = this.updateShopItem.bind(this);
		this.updateShopItemResult = this.updateShopItemResult.bind(this);
		this.redirect = this.redirect.bind(this);
    }

    componentWillMount() {
    	let _state = this.state;
    	_state.name = this.props.name;
    	_state.price = this.props.price;
        this.setState(_state);
    }

    componentWillUnmount() {
	}

	componentDidUpdate(prevProps, prevState) {
		let propsToCheck = ['name', 'price'];
		let _state = null;
		let _this = this;
		propsToCheck.forEach(function(propToCheck) {
			if (prevProps[propToCheck] !== _this.props[propToCheck]) {
				_state = _state == null ? _this.state : _state;
				_state[propToCheck] = _this.props[propToCheck];
			}
		})
		if (_state) {
			this.setState(_state);
		}
	}

    componentDidMount() {
    	console.log(this.props._shopItemId);
    	this.props.dispatch(shopActions.getShopItem(this.props._shopItemId));
    }

    editField(e) {
        let _state = this.state;
        console.log(this.state)
        _state[e.target.name] = e.target.value;
        this.setState(_state);
    }

	hitKey(event) {
		if (event.key == 'Enter') {
            this.updateShopItem();
        }
	}

    updateShopItem(e) {
		e.preventDefault();
		this.props.dispatch(shopActions.updateShopItem(this.state, this.props, this.updateShopItemResult));
    }

    updateShopItemResult(error) {
    	if (error) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
    	} else {
			this.redirect();
    	} 
    }

	redirect() {
		let _state = this.state;
		_state.redirect = true;
		this.setState(_state);
	}

	render() {
		if (this.state.redirect) {
			return (<Redirect to={'/shop/item/'+this.props._shopItemId} />);
		}

		if (!this.props.adminAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: this.props.location.pathname}}}/>)
		}


		console.log('props: '+this.props.name, 'state',this.state)
		return (
			<div className="shop-item-edit-wrapper" >
				<form onSubmit={this.updateShopItem}>
					<h3>EDIT ITEM</h3>
					<label>Name{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<input type='text' onKeyPress={this.hitkey} placeholder="Item Name" onChange={this.editField} name='name' value={this.state.name} />
					<br/>
					<label>Price{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<input type='text' onKeyPress={this.hitkey} placeholder="$0.00" onChange={this.editField} name='price' value={this.state.price} />
					<br/>
					<input type='submit' onClick={this.updateShopItem} value='SAVE' />
				</form>	
			</div>
		);			
	}
};

export default ShopItemEdit;