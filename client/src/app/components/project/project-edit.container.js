'use strict';

import { connect } from 'react-redux';
import ProjectEdit from './project-edit.component.js';

var mapStateToProps = function(state, props) {
	console.log('map to props', state.project.projectList, props.match);
	let _projectId = props.match.params._projectId;
	let projectList = state.project.projectList || {};
	let project = projectList[_projectId] || {};

	let _props = {
		_projectId: _projectId,
    	adminAccess: state.user.adminAccess 
    };
	_props.title = project.title || '';
	_props.year = project.year || '';
	_props.details = project.details || '';
	_props.coverImage = {};
	const coverImage = project.coverImage || {_imageId: null};
	_props.coverImage._imageId = coverImage._imageId;
	_props.discontinued = project.discontinued || false;
	return _props;
};

var Container = connect(mapStateToProps)(ProjectEdit);

export default Container;