'use strict';

import { connect } from 'react-redux';
import DoodlesPage from './doodles-page.component.js';

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(DoodlesPage);

export default Container;