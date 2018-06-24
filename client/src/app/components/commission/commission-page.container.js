'use strict';

import { connect } from 'react-redux';
import CommissionPage from './commission-page.component.js';

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(CommissionPage);

export default Container;
