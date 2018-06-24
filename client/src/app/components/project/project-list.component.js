'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import projectActions from '../../actions/project.actions.js';
import ProjectListItem from './project-list-item.container.js';

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    	let query = false;
    	if (this.props.limit) {
            query = {};
    		query.limit = this.props.limit;
    	}
    	this.props.dispatch(projectActions.getProjects(query));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    	let update = false;
    	let prevDiscontinued = prevProps.discontinued || false;
    	let currentDiscontinued = this.props.discontinued || false;

    	if (prevDiscontinued != currentDiscontinued) {
	    	update = true;
    	}

    	if (update) {
    		let query = {
    			discontinued: this.props.discontinued || false,
    			limit: this.props.limit || 10,
    		}
    		this.props.dispatch(projectActions.getProjects(query));
    	}

    }

	render() {
		let ProjectList = [];
		if (this.props.projectsDisplay) {
            let displayDetails = true;
            if ('displayDetails' in this.props) {
                displayDetails = this.props.displayDetails;
            }
            this.props.projectsDisplay.forEach(function(projectKey) {
				ProjectList.push(<ProjectListItem key={projectKey} _projectId={projectKey} displayDetails={displayDetails} />)
			});
		}
		return (
			<div className="project-wrapper" >
				{this.props.adminAccess ? (
					<div>
						<Link to="/project/new">NEW PROJECT</Link>
						<br/>
					</div>
				) : ''}
				<ul className='project-list' >
					{ProjectList}
				</ul>
			</div>
		);			
	}
};

export default ProjectList;