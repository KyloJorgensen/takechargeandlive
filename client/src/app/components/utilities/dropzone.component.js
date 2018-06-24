'use strict';

import React, { Component } from 'react';
import './dropzone.less';

class Dropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	over: false,
        	vaildFiles: [],
        	badFiles: [],
  		};

		this.onFilesSelected = this.onFilesSelected.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.handleFiles = this.handleFiles.bind(this);
		this.clearBadFile = this.clearBadFile.bind(this);
		this.validateFileType = this.validateFileType.bind(this);
		this.clearAllBadFiles = this.clearAllBadFiles.bind(this);
    }

	onFilesSelected(event) {
	    event.preventDefault();
	    this.handleFiles(event.target.files);
	}

	onDragOver(event) {
	    event.preventDefault()
	}

	onDragEnter(event) {
	    this.setState({ over: true })
	}

	onDragLeave(event) {
	    this.setState({ over: false })
	}

	onDrop(event) {
	    event.preventDefault();
	    this.handleFiles(event.dataTransfer.files);
	}

	handleFiles(_files) {
		const { validateFileType } = this;
		const multiple = this.props.multiple || false;
		const files = Object.values(_files);
		const vaildFiles = [];

		const _state = this.state;
		_state.badFiles = [];
		_state.image = new Blob();
		files.forEach(function(file, index, array) {
			if (validateFileType(file, index)) {
				if (!!multiple) {
					vaildFiles.push(file);
				} else {
					if (vaildFiles.length == 0) {
						vaildFiles.push(file);
					} else {
				    	_state.badFiles.push(file.name + " -- Only One File");
					}
				}
			}
		});
		if ('onChange' in this.props) {
			this.props.onChange(vaildFiles);
		}
		this.setState(_state);
	}

	validateFileType(file) {
		let fileTypes = [];
		if ('fileTypes' in this.props) {
			if (Array.isArray(fileTypes)) {
				fileTypes = this.props.fileTypes;
			}
		}

        if (fileTypes.includes(file.type)) {
			return true;
        } else {
        	const _state = this.state;
        	_state.badFiles.push(file.name + ' -- Invaild Type');
        	this.setState(_state);
        }
        return false;
	}

    clearAllBadFiles() {
		const _state = this.state;
		_state.badFiles = [];
		this.setState(_state); 
    }

    clearBadFile(index) {
		const _state = this.state;
		_state.badFiles.splice(index, 1);
		this.setState(_state);    	
    }

	render() {
		const badFiles = [];
		const { clearBadFile } = this;
		this.state.badFiles.forEach(function(badFile, index, array){
			const _clearBadFile = function() {
				clearBadFile(index);
			};
			badFiles.push(
				<li className="bad-file-wrapper" key={index} >
					<p>Bad File: {badFile}</p>
					<button onClick={_clearBadFile} >X</button>
				</li>
			);
		});

		return (
			<div className="dropzone-wrapper">
				<div className="dropzone">
					<div className="bad-file-display">
						{badFiles.length > 1 ? <button onClick={this.clearAllBadFiles} >Clear all bad files</button> : ''}
						<ul className="bad-files-wrapper" >{badFiles}</ul>
					</div>
					<div className="custom-dropzone">
					    <input type="file" multiple className="custom-dropzone-input dropzone" onChange={this.onFilesSelected} onDrop={this.onDrop} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} />
					   	<label className="custom-dropzone-label">{this.props.children ? this.props.children : <p>Drop Files or Click to Browse</p>}</label>
					</div>
				</div>
			</div>
		);
	}
};

export default Dropzone;