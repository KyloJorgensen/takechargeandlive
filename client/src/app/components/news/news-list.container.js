'use strict';

import { connect } from 'react-redux';
import NewsPage from './news-list.component.js';

var mapStateToProps = function(state, props) {
    return {
    	newsItemsDisplay: state.news.newsItemsDisplay,
    	newsItemList: state.news.newsItemList,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(NewsPage);

export default Container;