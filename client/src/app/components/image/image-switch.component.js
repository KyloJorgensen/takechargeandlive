'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Redirect, NavLink } from "react-router-dom";
import ImagePage from './image-page.container.js';
import Image from './image.container.js';
import ImageEdit from './image-edit.container.js';
import ImageNew from './image-new.container.js';
import ImageNewPage from './image-new-page.container.js';
import NoMatch from '../no-match.component.js';

class ImageSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

	render() {
		if (!this.props.adminAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: this.props.location.pathname}}}/>)
		}
		return (
			<div className="image-page-wrapper">
				<div className="container">
					<NavLink exact to={'/image'} activeClassName="selected" ><h2>Images</h2></NavLink>
                    <Switch>
						<Route exact path="/image" component={ImagePage} />
	                    <Route path="/image/new" component={ImageNewPage} />
	                    <Route path="/image/item/:_imageId" component={Image} />
	                    <Route path="/image/edit/:_imageId" component={ImageEdit} />
                        <Route component={NoMatch}/>
                    </Switch>
				</div>
			</div>
		);			
	}
};

export default ImageSwitch;