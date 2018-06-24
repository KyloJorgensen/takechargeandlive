'use strict';

import { connect } from 'react-redux';
import Project from './project.component.js';

var mapStateToProps = function(state, props) {
	let _projectId = props.match.params._projectId;
	let projectList = state.project.projectList || {};
	let project = projectList[_projectId] || {};

	let _props = {
		_projectId: _projectId,
    	adminAccess: state.user.adminAccess,
    };
	_props.title = project.title || '';
	_props.year = project.year || '';
	_props.details = project.details || '';
	_props.coverImage = {};
	const coverImage = project.coverImage || {};
    _props.coverImage._imageId = coverImage._imageId || null;
	_props.createdUpdatedDateTime = project.createdUpdatedDateTime || '';
	return _props;
};

var Container = connect(mapStateToProps)(Project);

export default Container;