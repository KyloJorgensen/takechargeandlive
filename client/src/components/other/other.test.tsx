'use strict';

import * as React from 'react';
import { shallow } from 'enzyme';
import Other from './other';

describe('Render <Other/> component', () => {
	it('matches the snapshot', () => {
		const wrapper = shallow(<Other />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should have only one div element', () => {
		const wrapper = shallow(<Other />);
		const div = wrapper.find('div');
		expect(div).toHaveProperty('length', 1);
	});

	it('should have a div with class of other', () => {
		const wrapper = shallow(<Other />);
		const otherClass = wrapper.find('div').hasClass('other')
		expect(otherClass).toBeTruthy();
	});

	it('should have only one p element', () => {
		const wrapper = shallow(<Other />);
		const p = wrapper.find('p');
		expect(p).toHaveProperty('length', 1);
	});

	it('should have a p element with text', () => {
		const wrapper = shallow(<Other/>);
		const p = wrapper.find('p');
		const text = p.text();
		expect(text).toEqual('Other Page');
	});
});
