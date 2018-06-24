'use strict';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import {NavLink} from "react-router-dom";
import SoundboardPage from './soundboard-page.component.js';
import NoMatch from '../no-match.component';

class SoundboardSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

	render() {
		return (
			<div className="soundboard-switch-wrapper">
				<div className="container">
					<NavLink exact to={'/soundboard'} activeClassName="selected" ><h2>Soundboard</h2></NavLink>
                    <Switch>
						<Route exact path="/soundboard" component={SoundboardPage} />
                        <Route path="/soundboard/soundboard" component={NoMatch} />
                        <Route component={NoMatch}/>
                    </Switch>
				</div>
			</div>
		);			
	}
};

export default SoundboardSwitch;