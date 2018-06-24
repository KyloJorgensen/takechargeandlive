'use strict';

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import {Link} from "react-router-dom";
import newsActions from '../../actions/news.actions';

class NewsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(newsActions.getNewsItem(this.props._newsItemId));
    }

	render() {
		return (
			<div className="news-item-wrapper" >
				<RichTextEditor value={RichTextEditor.createValueFromString(this.props.post, 'html')} readOnly={true} />
				<p className='news-created-updated-date-time' >{this.props.createdUpdatedDateTime}</p>
				{this.props.adminAccess ? <Link to={'/news/edit/'+this.props._newsItemId}>EDIT</Link> : ''}
			</div>
		);			
	}
};

export default NewsItem;