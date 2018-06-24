'use strict';

import { connect } from 'react-redux';
import ImageEdit from './image-edit.component.js';
import objectPath from 'object-path';

var mapStateToProps = function(state, props) {
	let _imageId = objectPath.has(props,'match.params._imageId') ? props.match.params._imageId : props._imageId;
	let imageList = state.image.imageList || {};
	let image = imageList[_imageId] || {};

	let _props = {_imageId: _imageId};
	_props.name = image.name || '';
	_props.alt = image.alt || '';
	_props.filename = image.filename || '';
	_props.discontinued = image.discontinued || false;
	console.log(_props);
	return {
		_imageId: _imageId,
		name: _props.name,
		alt: _props.alt,
		filename: _props.filename,
		discontinued: _props.discontinued,
    	adminAccess: state.user.adminAccess,
	};
};

var Container = connect(mapStateToProps)(ImageEdit);

export default Container;