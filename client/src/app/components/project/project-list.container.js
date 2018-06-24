'use strict';

import { connect } from 'react-redux';
import ProjectList from './project-list.component.js';

var mapStateToProps = function(state, props) {
    return {
    	projectsDisplay: state.project.projectsDisplay,
    	projectList: state.project.projectList,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(ProjectList);

export default Container;