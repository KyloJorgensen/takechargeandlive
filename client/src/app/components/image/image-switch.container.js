'use strict';

import { connect } from 'react-redux';
import ImageSwitch from './image-switch.component';

var mapStateToProps = function(state, props) {
    return {
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(ImageSwitch);

export default Container;