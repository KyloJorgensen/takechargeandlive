'use strict';

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import {Redirect} from "react-router-dom";
import Datetime from 'react-datetime';
import projectActions from '../../actions/project.actions.js';
import ImageNew from '../image/image-new.container.js';
import ImageEdit from '../image/image-edit.container.js';

class ProjectNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	_projectId: false,
        	required: false,
        	imageRequired: false,
        	title: null,
        	coverImage: {
        		_imageId: null,
        	}, 
        	year: Date.now(),
        	details: RichTextEditor.createEmptyValue(),
        };


		this.hitKey = (project) => {
			if (project.key == 'Enter') {
	            this.addNewProject();
	        }
		}

	    this.yearChanged = (momentDateTime) => {
	    	console.log(momentDateTime);
	    	let _state = this.state;
	    	_state.year = momentDateTime;
	    	this.setState(_state);
	    }

	    this.addNewProject = (e) => {
			e.preventDefault();
			let title = this.refs.title.value;
			const { year, details, coverImage } = this.state;
			if (!title || !year) {
				let _state = this.state;
				_state.required = true;
				this.setState(_state);
				return;
			}

			let newProject = {
				title: title,
				year: year,
				details: details.toString('html'),
			}

			if (coverImage._imageId != null) {
				newProject.coverImage = {};
				newProject.coverImage._imageId = coverImage._imageId;
			}

			this.props.dispatch(projectActions.addProject(newProject, this.addNewProjectResult));

				
			let _state = this.state;
			_state.required = false;
			this.setState(_state);
	    }

	    this.addNewProjectResult = (error, _projectId) => {
	    	if (error) {
				let _state = this.state;
				_state.required = true;
				this.setState(_state);
	    	} else {
				let _state = this.state;
				_state._projectId = _projectId;
				this.setState(_state);
	    	} 
	    }

	    this.onRichTextChange = (value) => {
	    	console.log(value);
	    	let _state = this.state;
			_state.details = value;
			this.setState(_state);
	    }

	    this.addNewImageResult = (error, _imageId) => {
		    if (error) {
				let _state = this.state;
				_state.imageRequired = true;
				this.setState(_state);
	    	} else {
				let _state = this.state;
				_state.coverImage._imageId = _imageId;
				_state.imageRequired = false;
				this.setState(_state);
	    	} 
	    }

		this.redirect = () => {
			let _state = this.state;
			_state.redirect = true;
			this.setState(_state);
		}
    }

    componentWillUnmount() {
    	if ('title' in this.refs) {
    		this.refs.title.value = '';
    	}
    	if ('year'in this.refs) {
    		this.refs.year.value = '';
    	}
	}

	render() {
		if (this.state.redirect) {
			return (<Redirect to='/project' />);
		}
		if (this.state._projectId) {
			return (<Redirect to={'/project/item/'+this.state._projectId} />);
		}
		if (!this.props.adminAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: this.props.location.pathname}}}/>)
		}

		const { addNewImageResult } = this;
		const { coverImage, imageRequired } = this.state;
	
		return (
			<div className="project-new-wrapper" >
				<form onSubmit={this.addNewProject}>
					<h3>New Project</h3>
					<label>Cover Image</label>
					{coverImage._imageId ? <ImageEdit _imageId={coverImage._imageId} updateRedirect={false} /> : <ImageNew required={imageRequired} addNewImageResult={addNewImageResult} />}
					
					<label>Title{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<input type='text' onKeyPress={this.hitkey} placeholder="Great Project" ref='title' />
					<br/>
					<label>Year{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<Datetime dateFormat="YYYY" timeFormat={false} onChange={this.yearChanged} value={this.state.year} />
					<br/>
					<label>Details</label>
					<br/>
					<RichTextEditor value={this.state.details} onChange={this.onRichTextChange} />
					<br/>
					<input type='submit' onClick={this.addNewProject} value='SAVE' />
				</form>	
			</div>
		);			
	}
};

export default ProjectNew;