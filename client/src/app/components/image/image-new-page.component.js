'use strict';

import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import imageActions from '../../actions/image.actions';
import Dropzone from '../utilities/dropzone.component.js';
import ImageNew from './image-new.container.js';

class ImageNewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	required: false,
        	images: [],
        };

		this.hitKey = this.hitKey.bind(this);
		this.addNewImage = this.addNewImage.bind(this);
		this.addNewImages = this.addNewImages.bind(this);
		this.addNewImageResult = this.addNewImageResult.bind(this);
		this.redirect = this.redirect.bind(this);
		this.imageDetailChanged = this.imageDetailChanged.bind(this);
    	this.imagesChanged = this.imagesChanged.bind(this);
    	this.imageChanged = this.imageChanged.bind(this);
    	this.deleteImage = this.deleteImage.bind(this);
    	this.deleteAllImages = this.deleteAllImages.bind(this);
    }

    deleteImage(index) {
		const _state = this.state;
		_state.images.splice(index, 1);
		this.setState(_state);
    }

    deleteAllImages() {
		const _state = this.state;
		_state.images = [];
		this.setState(_state); 
    }

    imageDetailChanged(index, event) {
        let _state = this.state;
        _state.images[index][event.target.name] = event.target.value;
        this.setState(_state);
    }

	hitKey(index, event) {
		if (event.key == 'Enter') {
            this.addNewImage(index, event);
        }
	}

    addNewImage(index, event) {
		event.preventDefault();
		const { image, name, alt } = this.state.images[index];
		console.log(index, event, image, name, alt)
		if (!name || !image.name) {
			let _state = this.state;
			_state.images[index].required = true;
			this.setState(_state);
			return;
		}

		const newImage = {};
		newImage.image = image;
		newImage.name = name;
		newImage.alt = alt;

		const { addNewImageResult } = this;
		const _addNewImageResult = function(error, _imageId) {
			addNewImageResult(index, error, _imageId);
		}
		this.props.dispatch(imageActions.addImage(newImage, _addNewImageResult));
		let _state = this.state;
		_state.images[index].required = false;
		this.setState(_state);
    }

    addNewImages(event) {
    	event.preventDefault();
    	
    }

    addNewImageResult(index, error, _imageId) {
    	if (error) {
			let _state = this.state;
			_state.images[index].required = true;
			this.setState(_state);
    	} else {
			let _state = this.state;
			// _state._imageId = _imageId;
			this.setState(_state);
    	} 
    }

    imageChanged(index, images) {
    	const _state = this.state;
    	_state.images[index].image = images[0];    	
    	this.setState(_state);
    }

    imagesChanged(images) {
    	const _state = this.state;
    	images.forEach(function(image) {
    		_state.images.push({
    			image: image,
    			name: '',
    			alt: '',
    			required: false,
    		})
    	});
    	this.setState(_state);
    }

	redirect() {
		let _state = this.state;
		_state.redirect = true;
		this.setState(_state);
	}

	render() {
		const { redirect, _imageId, images } = this.state;
		const { adminAccess } = this.props;
		const { deleteAllImages, deleteImage, imageDetailChanged, hitKey, addNewImage, addNewImages, imageChanged, imagesChanged } = this;
		if (redirect) {
			return (<Redirect to='/image' />);
		}
		if (_imageId) {
			return (<Redirect to={'/image/item/'+this.state._imageId} />);
		}
		if (!adminAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: this.props.location.pathname}}}/>)
		}

		const _images = [];

		images.forEach(function(_image, index, array){
			const { image, name, alt, required } = _image;
			const _deleteImage = function() {
				deleteImage(index);
			};
			const _imageDetailChanged = function(e) {
				imageDetailChanged(index, e);
			}
			const _hitKey = function(e) {
				hitKey(index, e);
			}
			const _addNewImage = function(e) {
				addNewImage(index, e);
			}
			const _imageChanged = function(e) {
				imageChanged(index, e);
			}
			_images.push(
				<li className="image-new-list-item" key={index} >
					<ImageNew required={required} image={image} name={name} alt={alt} deleteImage={_deleteImage} imageDetailChanged={_imageDetailChanged} hitKey={_hitKey} addNewImage={_addNewImage} imageChanged={_imageChanged} />
				</li>
			);
		});	



		return (
			<div className="image-new-page-wrapper" >							
				<Dropzone multiple={true} onChange={imagesChanged} fileTypes={['image/jpeg','image/pjpeg','image/png']} />
				<ul className="image-new-list" >
					{_images}
				</ul>
				{images.length > 1 ? (<input type="button" onClick={deleteAllImages} value='Delete All Images' />) : ''}
				{images.length > 1 ? (<input type='submit' onClick={addNewImages} value='SAVEALL' />) : ''}
			</div>
		);			
	}
};

export default ImageNewPage;




// 'use strict';

// import React, { Component } from 'react';

// class ImageUpload extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         	title: '',
//         	src: '',
//         	alt: '',
//         	image: null, 
//         	error: '', 
//         	over: false,
//         	images: [],
//         	badFiles: [],
//         	imagesLoaded: [],
//   		};
// 		// this.onClick = this.onClick.bind(this);
// 		// this.updateImage = this.updateImage.bind(this);
// 		// this.handleFile = this.handleFile.bind(this);
// 		// this.onDragOver = this.onDragOver.bind(this);
// 		// this.onDragEnter = this.onDragEnter.bind(this);
// 		// this.onDragLeave = this.onDragLeave.bind(this);
// 		// this.onDrop = this.onDrop.bind(this);
// 		// this.deleteImage = this.deleteImage.bind(this);
// 		// this.deleteBadFile = this.deleteBadFile.bind(this);
// 		// this.imageChanged = this.imageChanged.bind(this);;
// 		// this.validateFileType = this.validateFileType.bind(this);

// 		const bindFunctions = [
// 			'onClick',
// 			'updateImage',
// 			'handleFile',
// 			'onDragOver',
// 			'onDragEnter',
// 			'onDragLeave',
// 			'onDrop',
// 			'deleteImage',
// 			'deleteBadFile',
// 			'imageChanged',
// 			'validateFileType',
// 			'clearAllBadFiles',
// 			'deleteAllImages',
// 		];

// 		let _this = this;
// 		bindFunctions.forEach(function(bindFunction) {
// 			_this[bindFunction] = _this[bindFunction].bind(_this);
// 		})

//     }

// 	handleFile(event) {
// 	    event.preventDefault();
// 		Object.values(event.target.files).forEach(this.validateFileType);
// 	}

// 	onDragOver(event) {
// 	    event.preventDefault()
// 	}

// 	onDragEnter(event) {
// 	    this.setState({ over: true })
// 	}

// 	onDragLeave(event) {
// 	    this.setState({ over: false })
// 	}

// 	onDrop(event) {
// 	    event.preventDefault();
// 		Object.values(event.dataTransfer.files).forEach(this.validateFileType);
// 	}

// 	validateFileType(file) {
// 		const fileTypes = [
// 		    'image/jpeg',
// 		    'image/pjpeg',
// 		    'image/png'
// 		];
// 		const _state = this.state;
//         if (fileTypes.includes(file.type)) {
//         	const image = {
//         		image: file,
//         		name: '',
//       			alt: '',
//         	};
// 			_state.images.push(image);
//         } else {
//         	_state.badFiles.push(file);
//         }
// 		this.setState(_state);
// 	}

// 	onClick() {
// 		let _state = this.state;
// 		this.setState(_state);
// 	}

//     updateImage(event) {
//         let _state = this.state;
//         _state[event.target.id] = event.target.value;
//         this.setState(_state);
//     }

//     deleteImage(index) {
//     	console.log('deleteImage', index);
// 		const _state = this.state;
// 		_state.images.splice(index, 1);
// 		this.setState(_state);
//     }

//     deleteAllImages() {
// 		const _state = this.state;
// 		_state.images = [];
// 		this.setState(_state); 
//     }

//     deleteBadFile(index) {
//     	console.log('deleteBadFile', index);
// 		const _state = this.state;
// 		_state.badFiles.splice(index, 1);
// 		this.setState(_state);    	
//     }

//     clearAllBadFiles() {
// 		const _state = this.state;
// 		_state.badFiles = [];
// 		this.setState(_state); 
//     }

//     imageChanged(index, e) {
//         let _state = this.state;
//         _state.images[index][event.target.name] = event.target.value;
//         this.setState(_state);
//     }

// 	render() {
// 		let originalSource;
// 		if (this.state.src) {						
// 			originalSource = (<input type="text" id='originalSource' onChange={this.updateImage} value={this.props.originalSource} />);
// 		}
// 		// let images = this.state.images;
// 		const images = [];
// 		const { deleteImage, imageChanged } = this;
// 		this.state.images.forEach(function(image, index, array){
// 			const _deleteImage = function() {
// 				deleteImage(index);
// 			};
// 			const _imageChanged = function(e) {
// 				imageChanged(index, e);
// 			}
// 			images.push(
// 				<li className="image-wrapper" key={index} >
// 					<div className="image" >
// 						<div className="image-pic">
// 							<img src={window.URL.createObjectURL(image.image)} alt={image.alt}/>
// 						</div>
// 						<div className="image-info" >
// 							<button onClick={_deleteImage} >X</button>
// 							<div className="image-info-details" >
// 								<p>{image.image.name} {image.image.type} </p>
// 							</div>
// 						</div>
// 					</div>
// 					<div className="image-input" >
// 						Name <input type="text" name="name" value={image.name} onChange={_imageChanged} />
// 						Alt  <input type="text" name="alt" value={image.alt} onChange={_imageChanged} />
// 					</div>
// 				</li>
// 			);
// 		});	

// 		const badFiles = [];
// 		const { deleteBadFile } = this;
// 		this.state.badFiles.forEach(function(badFile, index, array){
// 			const _deleteBadFile = function() {
// 				deleteBadFile(index);
// 			};
// 			badFiles.push(
// 				<li className="bad-file-wrapper" key={index} >
// 					<p>Bad File: {badFile.name}</p>
// 					<button onClick={_deleteBadFile} >X</button>
// 				</li>
// 			);
// 		});

// 		return (
// 			<div className="image-upload-wrapper">
// 				<div className="image-upload">


// 					<div className="input-group mb-3">
// 					  <div className="custom-file">
// 					    <input type="file" multiple accept="image/*" className="custom-file-input image-upload-dropzone" id="image-upload-zone" onChange={this.handleFile} onDrop={this.onDrop} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} />
// 					    <label className="custom-file-label" htmlFor="image-upload-zone">Drop Image or Click to Browse</label>
// 					  </div>
// 					</div>
// 					<div className="image-upload-display">
// 						{badFiles.length >= 1 ? <button onClick={this.clearAllBadFiles} >Clear all bad files</button> : ''}
// 						<ul className="bad-files-wrapper" >{badFiles}</ul>
// 						<ul className="images-wrapper" >{images}</ul>
// 						{images.length >= 1 ? <button onClick={this.deleteAllImages} >Delete All Images</button> : ''}
// 					</div>
// 					<input type="submit" value="Upload" />
// 				</div>
// 			</div>
// 		);
// 	}
// };

// export default ImageUpload;
