'use strict';

import { connect } from 'react-redux';
import Profile from './profile.component.js';

var mapStateToProps = function(state, props) {
    return {
    	email: state.user.email,
    	firstname: state.user.firstname,
    	lastname: state.user.lastname,
    };
};

var Container = connect(mapStateToProps)(Profile);

export default Container;