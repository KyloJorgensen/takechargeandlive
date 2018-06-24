'use strict';
import * as React from 'react';

import { shallow, mount, render } from 'enzyme';
import { StaticRouter as Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import Routes from './routes';
import Main from './main/main';
import Other from './other/other';

describe('Render router component', () => {
	it('matches the snapshot', () => {
		const wrapper = shallow(<Routes/>);
		expect(wrapper).toMatchSnapshot();
	});

	it.skip('on route / to have Main component ', () => {
		const wrapper = render(
			<Router location={{pathname: '/#/', hash: '#'}} context={{}} > 
				<Routes/>
			</Router>
		);

		console.log("hellof");
		console.log(wrapper.find('div').html());
		const mainRoute = wrapper.find('div.main').length;
		expect(mainRoute).toEqual(2);

	});
	it.skip('on route /other to have Other component ', () => {
		const wrapper = mount(
			<Router location={{pathname: '/other'}} context={{}} > 
				<Routes/>
			</Router>
		);

		const otherRoute = wrapper.find("div.other").length;
		expect(otherRoute).toEqual(2);

	});
});
