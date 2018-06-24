'use strict';

import { connect } from 'react-redux';
import HeaderImgs from './header-imgs.component.js';

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(HeaderImgs);

export default Container;