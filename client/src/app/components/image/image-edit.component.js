'use strict';

import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import imageActions from '../../actions/image.actions';
import Dropzone from '../utilities/dropzone.component.js';

class ImageEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	_imageId: false,
        	required: false,
        	discontinued: false,
        	name: '',
        	alt: '',
        	image: new Blob(),
        };

		this.hitKey = this.hitKey.bind(this);
		this.updateImage = this.updateImage.bind(this);
		this.updateImageResult = this.updateImageResult.bind(this);
		this.redirect = this.redirect.bind(this);
		this.imageDetailChanged = this.imageDetailChanged.bind(this);
    	this.imageChanged = this.imageChanged.bind(this);
    	this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    componentWillMount() {
    	let _state = this.state;
    	const { name, alt, discontinued } = this.props;
    	_state.name = name;
    	_state.alt = alt;
    	_state.discontinued = discontinued;
        this.setState(_state);
    }

	componentDidUpdate(prevProps, prevState) {
		let propsToCheck = ['name', 'alt', 'discontinued'];
		let _state = null;
		let _this = this;
		propsToCheck.forEach(function(propToCheck) {
			if (prevProps[propToCheck] !== _this.props[propToCheck]) {
				_state = _state == null ? _this.state : _state;
				_state[propToCheck] = _this.props[propToCheck];
			}
		})
		if (_state) {
			this.setState(_state);
		}
	}

    componentDidMount() {
    	console.log(this.props._imageId)
    	this.props.dispatch(imageActions.getImage(this.props._imageId));
    }

	hitKey(e) {
		if (e.key == 'Enter') {
            this.updateImage(e);
        }
	}

	imageDetailChanged(event) {
        let _state = this.state;
        _state[event.target.name] = event.target.value;
        this.setState(_state);
    }

    updateImage(e) {
		e.preventDefault();
		const { image, name, alt } = this.state;
		
		if (!name) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
			return;
		}

		this.props.dispatch(imageActions.updateImage(this.state, this.props, this.updateImageResult));
		let _state = this.state;
		_state.required = false;
		this.setState(_state);
    }

    updateImageResult(error, _imageId) {
    	if (error) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
    	} else {
    		if (!!this.props.updateRedirect) {
				this.redirect();
    		}
    	} 
    }

    imageChanged(images) {
    	const _state = this.state;
    	if (images.length > 0) {
    		_state.image = images[0];
    	}
    	this.setState(_state);
    }

    handleCheckboxChange(e) {
        let _state = this.state;
        _state[e.target.name] = e.target.checked;
        this.setState(_state);
    }

	redirect() {
		let _state = this.state;
		_state.redirect = true;
		this.setState(_state);
	}

	render() {
		const { imageDetailChanged, hitKey, updateImage, imageChanged, handleCheckboxChange } = this;
		const { redirect, image, name, alt, required, discontinued } = this.state;
		const { adminAccess, filename, _imageId } = this.props;
		if (redirect) {
			return (<Redirect to={'/image/item/'+_imageId} />);
		}
		if (!adminAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: this.props.location.pathname}}}/>)
		}

		const dropzoneDisplay = 'name' in image ? (
			<div className='dropzone-display'>
				<img src={window.URL.createObjectURL(image)} alt={alt}/>
				<p>Drop Image or Click to Browse</p>
			</div>
		) : filename ? 
			<div className='dropzone-display'>
				<img src={filename} alt={alt}/>
				<p>Drop Image or Click to Browse</p>
			</div> : '';

		return (
			<div className="image-edit-item-wrapper" >
				<div className='image-wrapper' >
					<div className="image" >
						<div className="image-pic">
							<Dropzone multiple={false}  onChange={imageChanged} fileTypes={['image/jpeg','image/pjpeg','image/png']} >
								{dropzoneDisplay}
							</Dropzone>
						</div>
						<div className="image-info" >
							<div className="image-info-details" >
								<h3>Edit Image</h3>
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
						<label>Discontinued</label>
					<input type='checkbox' checked={!!discontinued} name="discontinued" onChange={handleCheckboxChange} />
					</div>
				</div>
				<input type='submit' onClick={updateImage} value='SAVE' />
			</div>
		);			
	}
};

export default ImageEdit;