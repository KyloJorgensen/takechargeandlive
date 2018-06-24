'use strict';

import { connect } from 'react-redux';
import SoundboardSwitch from '../../components/soundboard/soundboard-switch.component';

var mapStateToProps = function(state, props) {
	return {};
};

var Container = connect(mapStateToProps)(SoundboardSwitch);

export default Container;