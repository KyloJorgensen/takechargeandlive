'use strict';

import { connect } from 'react-redux';
import ProjectMain from './project-main.component.js';

var mapStateToProps = function(state, props) {
    return {
    	projectsDisplay: state.project.projectsDisplay,
    	projectList: state.project.projectList,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(ProjectMain);

export default Container;