'use strict';

import { connect } from 'react-redux';
import Image from './image.component.js';

var mapStateToProps = function(state, props) {
	let _imageId = props.match.params._imageId;
	let imageList = state.image.imageList || {};
	let image = imageList[_imageId] || {};

	let _props = {
		_imageId: _imageId,
    	adminAccess: state.user.adminAccess,
    };
	_props.name = image.name || '';
	_props.alt = image.alt || '';
	_props.filename = image.filename || window.URL.createObjectURL(new Blob());
	return _props;
};

var Container = connect(mapStateToProps)(Image);

export default Container;