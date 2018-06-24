'use strict';

import { connect } from 'react-redux';
import ProfilePage from './profile-page.component.js';

var mapStateToProps = function(state, props) {
    return {
    	adminAccess: state.user.adminAccess,
    	userAccess: state.user.access,
    };
};

var Container = connect(mapStateToProps)(ProfilePage);

export default Container;