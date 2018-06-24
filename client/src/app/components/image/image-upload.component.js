'use strict';

import React, { Component } from 'react';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	title: '',
        	src: '',
        	alt: '',
  		};
  		this.onClick = this.onClick.bind(this);
  		this.updateImage = this.updateImage.bind(this);
    }

	onClick() {
		let _state = this.state;
		this.setState(_state);
	}

    updateImage(e) {
        let _obj = {};
        _obj[e.target.id] = e.target.value;
        let _state = this.state;
        	_state[e.target.id] = e.target.value;
        this.setState(_state);
        console.log(this.refs);
        // this.props.dispatch(labelActions.updateImage(_obj));
    }

	render() {
		let originalSource;
		if (this.state.src) {						
			originalSource = (<input type="text" id='originalSource' onChange={this.updateImage} value={this.props.originalSource} />);
		}
		return (
			<div className="image-upload-form-wrapper">
				<form className="image-upload-form">
					<div className="image-upload-dropzone-wrapper">
						<input type='file' className="image-upload-dropzone" />
					</div>
					<div className="image-upload-display">
						
					</div>
					<div>
						<p>Title: <input type="text" ref='title' id='title' value={this.state.title} onChange={this.updateImage} /></p>
					</div>
					<div>
						<p>Alt: <input type="text" id='alt' value={this.state.alt} onChange={this.updateImage} /></p>
					</div>
					<div>
						<p>Original Source: <select id="src" value={this.state.src} onChange={this.updateImage} >
	                    	<option value="" >None</option>
	                    	<option value="URL" >URL</option>
	                		<option value="Other" >Other</option>
	                	</select> {originalSource}</p>
	                	
					</div>
					<input type="submit" value="Upload" />
				</form>
			</div>
		);
	}
};

export default ImageUpload;