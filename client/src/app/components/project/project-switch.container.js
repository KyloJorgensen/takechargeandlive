'use strict';

import { connect } from 'react-redux';
import ProjectSwitch from './project-switch.component.js';

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(ProjectSwitch);

export default Container;