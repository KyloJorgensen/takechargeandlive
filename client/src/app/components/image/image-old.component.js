'use strict';

import React, { Component } from 'react';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	name: '',
        	src: '',
        	alt: '',
        	image: null, 
        	error: '', 
        	over: false
  		};
  		this.onClick = this.onClick.bind(this);
  		this.updateImage = this.updateImage.bind(this);
  		this.onLoad = this.onLoad.bind(this);
    }

	onLoad(event) {
		console.log('onLoad', event);
	    const { naturalWidth, naturalHeight } = event.target
	    const { imageWidth, imageHeight, anySize } = this.props

	    if (!anySize &&
	        ((imageWidth && imageWidth !== naturalWidth) ||
	            (imageHeight && imageHeight !== naturalHeight))
	    ) {
	        this.setState({
	            error: `Wrong image dimensions ${naturalWidth}x${naturalHeight}`,
	            image: null
	        })
	    } else {
	        this.setState({ error: '' })
	    }
	}

	onClick() {
		let _state = this.state;
		this.setState(_state);
	}

    updateImage(event) {
        let _state = this.state;
        _state[event.target.id] = event.target.value;
        this.setState(_state);
    }

	render() {
		let originalSource;
		if (this.state.src) {						
			originalSource = (<input type="text" id='originalSource' onChange={this.updateImage} value={this.props.originalSource} />);
		}
		return (
			<li className="image-upload-form-wrapper">
				<form className="image-upload-form">
					{/*<div className="image-upload-dropzone-wrapper">
						<input type='file' multiple className="image-upload-dropzone" onChange={this.handleFile} onDrop={this.onDrop} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} />
					</div>*/}


					{/*<div className="input-group mb-3">
					  <div className="custom-file">
					    <input type="file" multiple className="custom-file-input image-upload-dropzone" id="image-upload-zone" onChange={this.handleFile} onDrop={this.onDrop} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} />
					    <label className="custom-file-label" for="image-upload-zone">Choose file</label>
					  </div>
					</div>*/}
					<div className="image-upload-display">
						<img src={window.URL.createObjectURL(this.props.image)} alt={this.state.alt} />
					</div>
					<div>
						<p>Title: <input type="text" ref='name' id='name' value={this.state.name} onChange={this.updateImage} /></p>
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
			</li>
		);
	}
};

export default ImageUpload;







//   constructor(props) {
//     super(props)
//     this.state = { image: null, error: '', over: false }
//   }

//   handleFile = event => {
//     let image = URL.createObjectURL(event.target.files[0])
//     let file = event.target.files[0]
//     this.setState({ file, image })
//     this.props.imagePicked({ index: this.props.imageIndex, file, image })
//   }

//   onDragOver = event => {
//     event.preventDefault()
//   }

//   onDragEnter = event => {
//     this.setState({ over: true })
//   }

//   onDragLeave = event => {
//     this.setState({ over: false })
//   }

//   onDrop = event => {
//     event.preventDefault()
//     let file = event.dataTransfer.files[0]
//     let image = URL.createObjectURL(file)

//     this.setState({
//       image,
//       over: false
//     })
//     this.props.imagePicked({ index: this.props.imageIndex, file, image })
//   }

//   onLoad = event => {
//     const { naturalWidth, naturalHeight } = event.target
//     const { imageWidth, imageHeight, anySize } = this.props

//     if (
//       !anySize &&
//       ((imageWidth && imageWidth !== naturalWidth) ||
//         (imageHeight && imageHeight !== naturalHeight))
//     ) {
//       this.setState({
//         error: `Wrong image dimensions ${naturalWidth}x${naturalHeight}`,
//         image: null
//       })
//     } else {
//       this.setState({ error: '' })
//     }
//   }

//   render() {
//     const { image, error, over } = this.state
//     const {
//       width,
//       height,
//       imageWidth,
//       imageHeight,
//       imageDefault,
//       anySize,
//       showButton
//     } = this.props

//     return (
//       <div>
//         <div
//           onDrop={this.onDrop}
//           onDragOver={this.onDragOver}
//           onDragLeave={this.onDragLeave}
//           onDragEnter={this.onDragEnter}
//           style={Object.assign(
//             {},
//             {
//               width: `${width}px`,
//               height: `${height}px`,
//               backgroundImage: `url(${image ? image : imageDefault})`,
//               backgroundRepeat: 'no-repeat',
//               backgroundPosition: 'center',
//               backgroundSize: 'contain'
//             },
//             style.frame,
//             over ? style.enter : style.leave
//           )}
//         >
//           {image !== null ? (
//             <img
//               onLoad={this.onLoad}
//               src={image}
//               alt={image}
//               width={0}
//               height={0}
//             />
//           ) : (
//             <div style={{ pointerEvents: 'none' }}>
//               <div style={style.label}>
//                 {imageDefault ? null : !anySize ? (
//                   <div>
//                     {imageWidth} x {imageHeight}
//                   </div>
//                 ) : (
//                   'Drop Here'
//                 )}

//                 <div>{error}</div>
//               </div>
//             </div>
//           )}
//         </div>

//         {showButton ? (
//           <div className="button-container">
//             <label className="button">
//               Choose File
//               <input
//                 style={{ display: 'none' }}
//                 type="file"
//                 onChange={this.handleFile}
//               />
//             </label>
//           </div>
//         ) : null}
//       </div>
//     )
//   }
// }

// export default ImageDropZone