'use strict';

import * as React from 'react';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import Provider from './provider';

let wrapper: ShallowWrapper;

describe('Render main route component', () => {
	it.skip('matches the snapshot', () => {
		wrapper = shallow(<Provider />);
		expect(wrapper).toMatchSnapshot();
	});

	it.skip('should have a p', () => {
		wrapper = shallow(
			<Provider>
				<p>child</p>
			</Provider>
		);
		const child = wrapper.find('p');
		expect(child.length).toEqual(1);
	});

	it.skip('should have a p that contains "child"', () => {
		wrapper = shallow(
			<Provider>
				<p>child</p>
			</Provider>
		);
		const child = wrapper.find('p').contains('child');
		expect(child).toEqual(true);
	});
});
