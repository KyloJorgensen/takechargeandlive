'use strict';

import { connect } from 'react-redux';
import ContactPage from './contact-page.component.js';

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(ContactPage);

export default Container;