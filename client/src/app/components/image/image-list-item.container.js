'use strict';

import { connect } from 'react-redux';
import ImageListItem from './image-list-item.component.js';

var mapStateToProps = function(state, props) {
	let imageList = state.image.imageList || {};
	let image = imageList[props._imageId] || {name: '', alt: '', filename: window.URL.createObjectURL(new Blob()), discontined: false};

    return {
    	name: image.name,
        alt: image.alt,
        filename: image.filename,
        discontined: image.discontined,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(ImageListItem);

export default Container;