'use strict';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import App from './app.component.js';

var mapStateToProps = function(state, props) {
    return {
        adminAccess: state.user.adminAccess,
        userAccess: state.user.access
    };
};

var Container = withRouter(connect(mapStateToProps)(App));

export default Container;