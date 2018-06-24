'use strict';

import { connect } from 'react-redux'
import ComicsPage from './comics-page.component.js';

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(ComicsPage);

export default Container;