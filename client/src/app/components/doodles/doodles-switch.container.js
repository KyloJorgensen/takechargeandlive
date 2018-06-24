'use strict';

import { connect } from 'react-redux';
import DoodlesSwitch from './doodles-switch.component.js';

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(DoodlesSwitch);

export default Container;