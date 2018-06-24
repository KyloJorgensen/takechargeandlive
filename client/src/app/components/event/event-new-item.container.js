'use strict';

import { connect } from 'react-redux';
import EventNewItem from './event-new-item.component.js';

var mapStateToProps = function(state, props) {
    return {
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(EventNewItem);

export default Container;