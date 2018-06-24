'use strict';

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import {Redirect} from "react-router-dom";
import Datetime from 'react-datetime';
import moment from 'moment';
import projectActions from '../../actions/project.actions.js';
import ImageNew from '../image/image-new.container.js';
import ImageEdit from '../image/image-edit.container.js';

class ProjectEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	required: false,
        	title: null,
        	year: null,
        	imageRequired: false,
        	coverImage: {
        		_imageId: null,
        	}, 
        	details: RichTextEditor.createEmptyValue(),
        	discontinued: false,
        };

	    this.editField = (e) => {
	        let _state = this.state;
	        _state[e.target.name] = e.target.value;
	        this.setState(_state);
	    }

	    this.handleCheckboxChange = (e) => {
	        let _state = this.state;
	        _state[e.target.name] = e.target.checked;
	        this.setState(_state);
	    }

	    this.yearChanged = (momentDateTime) => {
	    	let _state = this.state;
	    	_state.year = momentDateTime;
	    	this.setState(_state);
	    }

		this.hitKey = (project) => {
			if (project.key == 'Enter') {
	            this.updateProject();
	        }
		}

	    this.updateProject = (e) => {
			e.preventDefault();

			let title = this.state.title;
			let year = this.state.year;
			let details = this.state.details;
			let discontinued = this.state.discontinued;

			if (!title || !year) {
				let _state = this.state;
				_state.required = true;
				this.setState(_state);
				return;
			}

			const changes = {};
			changes.title = title;
			changes.year = year;
			changes.details = details.toString('html');
			changes.discontinued = discontinued;

			this.props.dispatch(projectActions.updateProject(changes, this.props, this.updateProjectResult));
	    }

	    this.updateProjectResult = (error) => {
	    	if (error) {
				let _state = this.state;
				_state.required = true;
				this.setState(_state);
	    	} else {
				this.redirect();
	    	} 
	    }

	    this.onRichTextChange = (value) => {
	    	console.log(value);
	    	let _state = this.state;
			_state.details = value;
			this.setState(_state);
	    }

		this.redirect = () => {
			let _state = this.state;
			_state.redirect = true;
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
    }

    componentWillMount() {
    	let _state = this.state;
    	_state.title = this.props.title;
    	_state.year = moment(this.props.year);
    	_state.details = RichTextEditor.createValueFromString(this.props.details, 'html');
    	_state.coverImage._imageId = this.props.coverImage._imageId;
    	_state.discontinued = this.props.discontinued;
        this.setState(_state);
    }

	componentDidUpdate(prevProps, prevState) {
		let propsToCheck = ['title', 'year', 'coverImage', 'details', 'discontinued'];
		let _state = null;
		let _this = this;
		propsToCheck.forEach(function(propToCheck) {
			if (prevProps[propToCheck] !== _this.props[propToCheck]) {
				_state = _state == null ? _this.state : _state;
				
				if (propToCheck == 'coverImage') {
					if (prevProps[propToCheck]['_imageId'] !== _this.props[propToCheck]['_imageId']) {
						_state[propToCheck]['_imageId'] = _this.props[propToCheck]['_imageId'];
					}
				} else if (propToCheck == 'details') {
					_state[propToCheck] = RichTextEditor.createValueFromString(_this.props[propToCheck], 'html');
				} else {
					_state[propToCheck] = _this.props[propToCheck];
				}
			}
		})
		if (_state) {
			this.setState(_state);
		}
	}

    componentDidMount() {
    	this.props.dispatch(projectActions.getProject(this.props._projectId));
    }

	render() {
		if (this.state.redirect) {
			return (<Redirect to={'/project/item/'+this.props._projectId} />);
		}

		if (!this.props.adminAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: this.props.location.pathname}}}/>)
		}

		const { addNewImageResult } = this;
		const { coverImage, imageRequired } = this.state;
		console.log(coverImage, this.state, this.props)

		return (
			<div className="project-edit-wrapper" >
				<form onSubmit={this.updateProject}>
					<h3>EDIT PROJECT</h3>

					<label>Cover Image</label>
					{coverImage._imageId ? <ImageEdit _imageId={coverImage._imageId} updateRedirect={false} /> : <ImageNew required={imageRequired} addNewImageResult={addNewImageResult} />}
					
					<label>Title{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<input type='text' onKeyPress={this.hitkey} placeholder="Great Project" onChange={this.editField} name='title' value={this.state.title} />
					<br/>
					<label>Year{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<Datetime dateFormat="YYYY" timeFormat={false} value={this.state.year} onChange={this.yearChanged} />
					<br/>
					<label>Details</label>
					<br/>
					<RichTextEditor value={this.state.details} onChange={this.onRichTextChange} />
					<p className='news-created-updated-date-time' >{this.props.createdUpdatedDateTime}</p>
					<br/>
					<label>Discontinued</label>
					<br/>
					<input type='checkbox' checked={!!this.state.discontinued} name="discontinued" onChange={this.handleCheckboxChange} />
					<br/>
					<input type='submit' onClick={this.updateProject} value='SAVE' />
				</form>	
			</div>
		);			
	}
};

export default ProjectEdit;