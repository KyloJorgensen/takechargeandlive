'use strict';

import { connect } from 'react-redux';
import ProjectListItem from './project-list-item.component.js';

var mapStateToProps = function(state, props) {
	let projectList = state.project.projectList || {};
	let project = projectList[props._projectId] || {title: '', year: '', coverImage: {_imageId: null}, details: '', createdUpdatedDateTime: ''};
    
    let _props = {
        adminAccess: state.user.adminAccess,
    };
    _props.title = project.title || '';
    _props.year = project.year || '';
    _props.details = project.details || '';
    _props.coverImage = {};
    _props.coverImage._imageId = project.coverImage._imageId || null;
    _props.createdUpdatedDateTime = project.createdUpdatedDateTime || '';

    return _props;
};

var Container = connect(mapStateToProps)(ProjectListItem);

export default Container;