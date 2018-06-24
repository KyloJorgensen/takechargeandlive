'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imageActions from '../../actions/image.actions.js';
import ImageListItem from './image-list-item.container.js';

class ImageList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	let query = false;
    	if (this.props.limit) {
            query = {};
    		query.limit = this.props.limit;
    	}
    	this.props.dispatch(imageActions.getImages(query));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    	let update = false;
    	let prevDiscontinued = prevProps.discontinued || false;
    	let currentDiscontinued = this.props.discontinued || false;

    	if (prevDiscontinued != currentDiscontinued) {
	    	update = true;
    	}

    	if (update) {
    		let query = {
    			discontinued: this.props.discontinued || false,
    			limit: this.props.limit || 10,
    		}
    		this.props.dispatch(imageActions.getImages(query));
    	}

    }

	render() {
		let ImageList = [];
		if (this.props.imagesDisplay) {
            let displayDetails = true;
            if ('displayDetails' in this.props) {
                displayDetails = this.props.displayDetails;
            }
            this.props.imagesDisplay.forEach(function(imageKey) {
				ImageList.push(<ImageListItem key={imageKey} _imageId={imageKey} displayDetails={displayDetails} />)
			});
		}
		return (
			<div className="image-list-wrapper" >
				{this.props.adminAccess ? (
					<div>
						<Link to="/image/new">NEW IMAGE</Link>
						<br/>
					</div>
				) : ''}
				<ul className='image-list' >
					{ImageList}
				</ul>
			</div>
		);			
	}
};

export default ImageList;