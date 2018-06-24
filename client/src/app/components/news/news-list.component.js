'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import newsActions from '../../actions/news.actions.js';
import NewsListItem from './news-list-item.container.js';

class NewsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(newsActions.getNewsItems());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    	let update = false;
    	let prevDiscontinued = prevProps.discontinued || false;
    	let currentDiscontinued = this.props.discontinued || false;

    	if (prevDiscontinued != currentDiscontinued) {
	    	update = true;
    	}

    	if (update) {
    		let query = {
    			discontinued: this.props.discontinued || false,
    			limit: this.props.limit || 10,
    		}
    		this.props.dispatch(newsActions.getNewsItems(query));
    	}
    }

	render() {
		let NewsItemList = [];
		if (this.props.newsItemsDisplay) {
			this.props.newsItemsDisplay.forEach(function(newsItemKey) {
				NewsItemList.push(<NewsListItem key={newsItemKey} _newsItemId={newsItemKey}/>)
			});
		}
		return (
			<div className="news-list-wrapper" >
				{this.props.adminAccess ? (
					<div>
						<Link to="/news/newitem">NEW ITEM</Link>
						<br/>
					</div>
				) : ''}
				<ul className='news-item-list' >
					{NewsItemList}
				</ul>
			</div>
		);			
	}
};

export default NewsPage;