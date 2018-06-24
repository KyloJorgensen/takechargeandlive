'use strict';

import { connect } from 'react-redux';
import ComicsSwitch from './comics-switch.component.js';

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(ComicsSwitch);

export default Container;