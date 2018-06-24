'use strict';

import { connect } from 'react-redux';
import InfoSwitch from './info-switch.component.js';

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(InfoSwitch);

export default Container;