'use strict';

import { connect } from 'react-redux';
import SoundboardPage from './soundboard-page.component.js';

const mapStateToProps = function(state, props) {
	return {};
};

const Container = connect(mapStateToProps)(SoundboardPage);

export default Container;