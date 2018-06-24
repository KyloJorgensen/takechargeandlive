'use strict';

import { connect } from 'react-redux';
import Profile from './profile-change-password.component.js';

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(Profile);

export default Container;