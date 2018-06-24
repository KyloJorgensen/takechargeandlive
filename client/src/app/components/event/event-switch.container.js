'use strict';

import { connect } from 'react-redux';
import EventSwitch from './event-switch.component.js';

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(EventSwitch);

export default Container;