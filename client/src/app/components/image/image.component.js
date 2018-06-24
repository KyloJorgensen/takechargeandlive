'use strict';

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import imageActions from '../../actions/image.actions.js';

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(imageActions.getImage(this.props._imageId));
    }

	render() {
		const { adminAccess, _imageId, name, alt, filename } = this.props;
		return (
			<div className="image-wrapper" >
				{adminAccess ? <p className="text-right" ><Link to={'/image/edit/'+_imageId}>EDIT</Link></p> : ''}
				<img src={filename} alt={alt} />
				<p>{name}</p>
				<p>{alt}</p>
			</div>
		);			
	}
};

export default Image;