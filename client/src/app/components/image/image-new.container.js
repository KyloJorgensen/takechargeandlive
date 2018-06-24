'use strict';

import { connect } from 'react-redux';
import ImageNew from './image-new.component.js';

var mapStateToProps = function(state, props) {
    return {
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(ImageNew);

export default Container;