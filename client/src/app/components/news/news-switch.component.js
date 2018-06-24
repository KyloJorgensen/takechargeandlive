'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import {NavLink} from "react-router-dom";

import NewsPage from './news-page.container.js';
import NewsItem from './news-item.container.js';
import NewsItemEdit from './news-item-edit.container.js';
import NewsNewItem from './news-new-item.container.js';
import NoMatch from '../no-match.component.js';

class NewsSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

	render() {
		return (
			<div className="news-page-wrapper">
				<div className="container">
					<NavLink exact to={'/news'} activeClassName="selected" ><h2>News</h2></NavLink>
                    <Switch>
						<Route exact path="/news" component={NewsPage} />
	                    <Route path="/news/newitem" component={NewsNewItem} />
	                    <Route path="/news/item/:_newsItemId" component={NewsItem} />
	                    <Route path="/news/edit/:_newsItemId" component={NewsItemEdit} />
                        <Route component={NoMatch}/>
                    </Switch>
				</div>
			</div>
		);			
	}
};

export default NewsSwitch;