'use strict';

import * as React from 'react';
import { shallow } from 'enzyme';
import App from './app';

describe('Render main route component', () => {
	it('matches the snapshot', () => {
		let wrapper = shallow(<App />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should have a div', () => {

	});
});
