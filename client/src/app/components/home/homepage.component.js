'use strict';

import React, { Component } from 'react';

import Loadable from 'react-loadable';
import TwitchIframe from './home-twitch.component.js';
import Event from './home-event.container.js';
import NewSection from './home-news.container.js';
import CommingSoon from '../comming-soon.component.js';

// const TwitchIframe = Loadable({
//   loader: () => import('./home-twitch.component'),
//   loading: CommingSoon,
// });
// const Event = Loadable({
//   loader: () => import('../../containers/home/home-event.container'),
//   loading: CommingSoon,
// });
// const NewSection = Loadable({
//   loader: () => import('../../containers/home/home-news.container'),
//   loading: CommingSoon,
// });

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

	render() { 
		return (
		    <div className="home-page-wrapper" >
				<div className="container">
					<div className="row" >
						<TwitchIframe />
						<Event />
					</div>
					<NewSection/>
				</div>
		    </div>
		);
	}
};

export default HomePage;