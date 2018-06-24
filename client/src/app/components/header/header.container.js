'use strict';

import { connect } from 'react-redux';    
import { withRouter } from 'react-router';
import Header from './header.component.js';

var mapStateToProps = function(state, props) {
    return {
        firstname: state.user.firstname,
        lastname: state.user.lastname,
    	userAccess: state.user.access,
        adminAccess: state.user.adminAccess,
        title: 'Welcome',
    };
};

var Container = withRouter(connect(mapStateToProps)(Header));

export default Container;