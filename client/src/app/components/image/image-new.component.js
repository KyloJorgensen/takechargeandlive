'use strict';

import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import imageActions from '../../actions/image.actions';
import Dropzone from '../utilities/dropzone.component.js';

class ImageNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	_imageId: false,
        	required: false,
        	name: '',
        	alt: '',
        	image: new Blob(),
        };

		this.hitKey = this.hitKey.bind(this);
		this.addNewImage = this.addNewImage.bind(this);
		this.addNewImageResult = this.addNewImageResult.bind(this);
		this.redirect = this.redirect.bind(this);
		this.imageDetailChanged = this.imageDetailChanged.bind(this);
    	this.imageChanged = this.imageChanged.bind(this);
    	this.deleteImage = this.deleteImage.bind(this);
    }

	hitKey(e) {
		if (e.key == 'Enter') {
            this.addNewImage(e);
        }
	}

	imageDetailChanged(event) {
        let _state = this.state;
        _state[event.target.name] = event.target.value;
        this.setState(_state);
    }

    addNewImage(e) {
		e.preventDefault();
		const { image, name, alt } = this.state;
		
		if (!name || !image.name) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
			return;
		}

		const newImage = {};
		newImage.image = image;
		newImage.name = name;
		newImage.alt = alt;

		let addNewImageResult = 'addNewImageResult' in this.props ? this.props.addNewImageResult : this.addNewImageResult;
		this.props.dispatch(imageActions.addImage(newImage, addNewImageResult));
		let _state = this.state;
		_state.required = false;
		this.setState(_state);
    }

    addNewImageResult(error, _imageId) {
    	if (error) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
    	} else {
			let _state = this.state;
			_state._imageId = _imageId;
			this.setState(_state);
    	} 
    }

    imageChanged(images) {
    	const _state = this.state;
    	if (images.length > 0) {
    		_state.image = images[0];
    	}
    	this.setState(_state);
    }

    deleteImage() {
    	const _state = this.state;
		_state.required = false;
		_state.name = '';
		_state.alt = '';
		_state.image = new Blob();
    	this.setState(_state);
    }

	redirect() {
		let _state = this.state;
		_state.redirect = true;
		this.setState(_state);
	}

	render() {
		const { redirect, _imageId } = this.state;
		const { adminAccess } = this.props;
		if (redirect) {
			return (<Redirect to='/image' />);
		}
		if (_imageId) {
			return (<Redirect to={'/image/item/'+this.state._imageId} />);
		}
		if (!adminAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: this.props.location.pathname}}}/>)
		}
		// variables
		const image = 'image' in this.props ? this.props.image : this.state.image;
		const name = 'name' in this.props ? this.props.name : this.state.name;
		const alt = 'alt' in this.props ? this.props.alt : this.state.alt;
		const required = 'required' in this.props ? this.props.required : this.state.required;

		// functions
		const deleteImage = 'deleteImage' in this.props ? this.props.deleteImage : this.deleteImage;
		const imageDetailChanged = 'imageDetailChanged' in this.props ? this.props.imageDetailChanged : this.imageDetailChanged;
		const hitKey = 'hitKey' in this.props ? this.props.hitKey : this.hitKey;
		const addNewImage = 'addNewImage' in this.props ? this.props.addNewImage : this.addNewImage;
		const imageChanged = 'imageChanged' in this.props ? this.props.imageChanged : this.imageChanged;

		const dropzoneDisplay = 'name' in image ? (
			<div className='dropzone-display'>
				<img src={window.URL.createObjectURL(image)} alt={alt}/>
				<p>Drop Image or Click to Browse</p>
			</div>
		) : '';

		return (
			<div className="image-new-item-wrapper" >
				<div className='image-wrapper' >
					<div className="image" >
						<div className="image-pic">
							<Dropzone multiple={false}  onChange={imageChanged} fileTypes={['image/jpeg','image/pjpeg','image/png']} >
								{dropzoneDisplay}
							</Dropzone>
						</div>
						<div className="image-info" >
							<button onClick={deleteImage} >X</button>
							<div className="image-info-details" >
								<h3>New Image</h3>
								{required ? (<p className="errortext" >Image required</p>) : ''}
								<p>{image.name}</p>
								<p>{image.type} </p>
							</div>
						</div>
					</div>
					<div className="image-input" >
						<label>Name</label>
						<input type="text" onKeyPress={hitKey} name="name" value={name} onChange={imageDetailChanged} placeholder="Great Image" />{required ? (<span className="errortext" >*</span>) : ''}
						<label>Alt</label>
						<input type="text" onKeyPress={hitKey} name="alt" value={alt} onChange={imageDetailChanged} placeholder="blue tree pencil4life" />
					</div>
				</div>
				<input type='submit' onClick={addNewImage} value='SAVE' />
			</div>
		);			
	}
};

export default ImageNew;