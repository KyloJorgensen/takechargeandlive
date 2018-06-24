'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import {NavLink} from "react-router-dom";
// import ShopPage from './shop-page.container.js';
// import ShopItem from './shop-item.container.js';
// import ShopItemEdit from './shop-item-edit.container.js';
// import ShopNewItem from './shop-new-item.container.js';
import CommingSoon from '../comming-soon.component.js';
import NoMatch from '../no-match.component.js';

class ShopSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

	render() {
		return (
			<div className="shop-page-wrapper">
				<div className="container">
					<NavLink exact to={'/shop'} activeClassName="selected" ><h2>Shop</h2></NavLink>
                    <Switch>
                    	<Route exact path="/shop" component={CommingSoon} />
{/*						<Route exact path="/shop" component={ShopPage} />
	                    <Route path="/shop/newitem" component={ShopNewItem} />
	                    <Route path="/shop/item/:_shopItemId" component={ShopItem} />
	                    <Route path="/shop/edit/:_shopItemId" component={ShopItemEdit} />*/}
                        <Route component={NoMatch}/>
                    </Switch>
				</div>
			</div>
		);			
	}
};

export default ShopSwitch;