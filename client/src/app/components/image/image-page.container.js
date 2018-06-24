'use strict';

import { connect } from 'react-redux';
import ImagePage from './image-page.component.js';

var mapStateToProps = function(state, props) {
    return {
    	imagesDisplay: state.image.imagesDisplay,
    	imageList: state.image.imageList,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(ImagePage);

export default Container;