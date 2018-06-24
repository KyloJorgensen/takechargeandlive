'use strict';

import { connect } from 'react-redux';
import HomePage from './homepage.component.js';

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(HomePage);

export default Container;