'use strict';

import { connect } from 'react-redux';
import HomeNews from './home-news.component.js';

var mapStateToProps = function(state, props) {
    return {
    	newsItemsDisplay: state.news.newsItemsDisplay,
    	newsItemList: state.news.newsItemList,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(HomeNews);

export default Container;