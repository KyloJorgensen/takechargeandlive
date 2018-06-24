'use strict';

import { connect } from 'react-redux';
import Footer from './footer.component';

var mapStateToProps = function(state, props) {
    return {
	};
};

var Container = connect(mapStateToProps)(Footer);

export default Container;