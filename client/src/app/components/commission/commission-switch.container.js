'use strict';

import { connect } from 'react-redux';
import CommissionSwitch from './commission-switch.component.js';

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(CommissionSwitch);

export default Container;