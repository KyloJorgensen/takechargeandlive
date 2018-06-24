'use strict';

import { connect } from 'react-redux';
import NewsItemEdit from './news-item-edit.component.js';

var mapStateToProps = function(state, props) {
	let _newsItemId = props.match.params._newsItemId;
	let newsItemList = state.news.newsItemList || {};
	let newsItem = newsItemList[_newsItemId] || {};

	let _props = {_newsItemId: _newsItemId};
	_props.post = newsItem.post || '';
	_props.createdUpdatedDateTime = newsItem.createdUpdatedDateTime || '';
	return {
		_newsItemId: _newsItemId,
		post: _props.post,
		createdUpdatedDateTime: _props.createdUpdatedDateTime,
    	adminAccess: state.user.adminAccess,
	};
};

var Container = connect(mapStateToProps)(NewsItemEdit);

export default Container;