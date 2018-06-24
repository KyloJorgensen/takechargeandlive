'use strict';

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import { Link } from 'react-router-dom';
import moment from 'moment';
import objectPath from 'object-path';
import ImageTag from '../image/image-tag.container.js';
import projectActions from '../../actions/project.actions.js';

class ProjectListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	this.props.dispatch(projectActions.getProject(this.props._projectId));
    }

	render() {
		let year = moment(this.props.year).format("YYYY");;
		const coverImage = objectPath.get(this.props, 'coverImage._imageId', false) ? (<ImageTag _imageId={this.props.coverImage._imageId} />) : '';

		return (
			<div className="project-list-item-wrapper" >				
				<Link className="project-link" to={'/project/item/'+this.props._projectId} >
					<div className="image-wrapper">
						{coverImage}
					</div>
					<div className="title-year-wrapper">
						<p className="title">{this.props.title}</p>
						<p className="year">{year}</p>
					</div>
				</Link>
			</div>
		);		
	}
};

export default ProjectListItem;