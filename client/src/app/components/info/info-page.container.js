'use strict';

import { connect } from 'react-redux';
import InfoPage from './info-page.component.js';

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(InfoPage);

export default Container;