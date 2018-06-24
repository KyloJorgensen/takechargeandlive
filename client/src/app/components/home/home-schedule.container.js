'use strict';

import { connect } from 'react-redux';
import HomeSchedule from './home-schedule.component.js';

var mapStateToProps = function(state, props) {
    return {
    	scheduleItemsDisplay: state.schedule.scheduleItemsDisplay,
    	scheduleItemList: state.schedule.scheduleItemList,
    	adminAccess: state.user.adminAccess,
    };
};

var Container = connect(mapStateToProps)(HomeSchedule);

export default Container;