'use strict';

import { connect } from 'react-redux';
import NewsListItem from './news-list-item.component.js';

var mapStateToProps = function(state, props) {
	let newsItemList = state.news.newsItemList || {};
	let newsItem = newsItemList[props._newsItemId] || {post: '', createdUpdatedDateTime: ''};
    return {
    	post: newsItem.post,
    	createdUpdatedDateTime: newsItem.createdUpdatedDateTime,
    };
};

var Container = connect(mapStateToProps)(NewsListItem);

export default Container;