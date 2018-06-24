'use strict';

import { connect } from 'react-redux';
import ImageList from './image-list.component.js';

var mapStateToProps = function(state, props) {
    return {
    	imagesDisplay: state.image.imagesDisplay,
    	imageList: state.image.imageList,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(ImageList);

export default Container;