'use strict';

import { connect } from 'react-redux';
import NewsItem from './news-item.component.js';

var mapStateToProps = function(state, props) {
	let _newsItemId = props.match.params._newsItemId;
	let newsItemList = state.news.newsItemList || {};
	let newsItem = newsItemList[_newsItemId] || {};

	let _props = {
		_newsItemId: _newsItemId,
    	adminAccess: state.user.adminAccess,
	};
	_props.post = newsItem.post || '';
	_props.createdUpdatedDateTime = newsItem.createdUpdatedDateTime || '';
	return _props;
};

var Container = connect(mapStateToProps)(NewsItem);

export default Container;