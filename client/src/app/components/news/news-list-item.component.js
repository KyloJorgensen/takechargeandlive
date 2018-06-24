'use strict';

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import { Link } from 'react-router-dom';
import newsActions from '../../actions/news.actions';

class NewsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(newsActions.getNewsItem(this.props._newsItemId));
    }

	render() {
		return (
			<li className="news-list-item-wrapper" >
				<Link className="news-link" to={'/news/item/'+this.props._newsItemId} >
					<RichTextEditor value={RichTextEditor.createValueFromString(this.props.post, 'html')} readOnly={true} />	
				</Link>
				<p className='news-created-updated-date-time' >{this.props.createdUpdatedDateTime}</p>
			</li>
		);			
	}
};

export default NewsListItem;