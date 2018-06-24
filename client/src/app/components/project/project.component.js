'use strict';

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import {Redirect, Link} from "react-router-dom";
import moment from 'moment';
import objectPath from 'object-path';
import projectActions from '../../actions/project.actions.js';
import ImageTag from '../image/image-tag.container.js';

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(projectActions.getProject(this.props._projectId));
    	this.props.dispatch(projectActions.getProjectPages(this.props._projectId, {}));
    }

	render() {
		if (this.state.redirect) {
			return (<Redirect to='/project'/>);
		}

		let year = moment(this.props.year).format("YYYY");
		const coverImage = objectPath.get(this.props, 'coverImage._imageId', false) ? (<ImageTag _imageId={this.props.coverImage._imageId} />) : 'apple';

		return (
			<div className="project-wrapper" >
				{this.props.adminAccess ? <p className="text-right" ><Link to={'/project/edit/'+this.props._projectId}>EDIT</Link></p> : ''}
				{coverImage}
				<div className="title-year-wrapper">
					<p className="title">{this.props.title}</p>
					<p className="year">{year}</p>
				</div>
				<RichTextEditor value={RichTextEditor.createValueFromString(this.props.details, 'html')} readOnly={true} />
			</div>
		);			
	}
};

export default Project;