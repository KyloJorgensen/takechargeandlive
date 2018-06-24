'use strict';

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import imageActions from '../../actions/image.actions.js';

class ImageTag extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(imageActions.getImage(this.props._imageId));
    }

	render() {
		const { alt, filename } = this.props;
		return (
			<img src={filename} alt={alt} />
		);			
	}
};

export default ImageTag;