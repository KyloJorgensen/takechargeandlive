'use strict';

import { connect } from 'react-redux';
import ContactSwitch from './contact-switch.component.js';

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(ContactSwitch);

export default Container;