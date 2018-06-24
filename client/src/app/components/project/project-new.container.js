'use strict';

import { connect } from 'react-redux';
import ProjectNew from './project-new.component.js';

var mapStateToProps = function(state, props) {
    return {
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(ProjectNew);

export default Container;