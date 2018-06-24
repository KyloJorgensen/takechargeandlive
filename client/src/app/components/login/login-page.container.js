'use strict';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LoginPage from './login-page.component.js';

var mapStateToProps = function(state, props) {
	return {
		userAccess: state.user.access,
		adminAccess: state.user.adminAccess,
	};
};

var Container = withRouter(connect(mapStateToProps)(LoginPage));

export default Container;