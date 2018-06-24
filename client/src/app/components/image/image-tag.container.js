'use strict';

import { connect } from 'react-redux';
import ImageTag from './image-tag.component.js';

var mapStateToProps = function(state, props) {
	let _imageId = props._imageId;
	let imageList = state.image.imageList || {};
	let image = imageList[_imageId] || {};

	let _props = {
		_imageId: _imageId,
    };
	_props.alt = image.alt || '';
	_props.filename = image.filename || window.URL.createObjectURL(new Blob());
	return _props;
};

var Container = connect(mapStateToProps)(ImageTag);

export default Container;