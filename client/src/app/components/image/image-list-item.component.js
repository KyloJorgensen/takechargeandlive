'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imageActions from '../../actions/image.actions.js';

class ImageListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(imageActions.getImage(this.props._imageId));
    }

	render() {
		const { name, alt, filename, _imageId } = this.props;
		return (
			<div className="image-list-item-wrapper" >	
				<Link className="image-link" to={'/image/item/'+_imageId} >
					<img src={filename} alt={alt}/>
					<p>{name}</p>
					<p>{alt}</p>
				</Link>
			</div>
		);		
	}
};

export default ImageListItem;