'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { NavLink } from "react-router-dom";
import ProjectMain from './project-main.container.js';
import Project from './project.container.js';
import ProjectEdit from './project-edit.container.js';
import ProjectNew from './project-new.container.js';
import ProjectPage from './page/project-page.container.js';
import NoMatch from '../no-match.component.js';
import CommingSoon from '../comming-soon.component.js'
import './project.less';

const ProjectsContext = React.createContext({

});

class ProjectSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	projects: {

        	}
        };
    }

	render() {
		const { projects } = this.state;
		return (
			<div className="project-page-wrapper">
				<ProjectsContext.Provider value={projects} >
					<div className="container">
						<NavLink exact to={'/project'} activeClassName="selected" ><h2>Projects</h2></NavLink>
					    <Switch>
							<Route exact path="/project" component={ProjectMain} />
					        <Route path="/project/new" component={ProjectNew} />
					        <Route exact path="/project/item/:_projectId/:pageNumber" component={ProjectPage} />
					        <Route exact path="/project/item/:_projectId" component={Project} />
					        <Route exact path="/project/edit/:_projectId/:pageNumber" component={CommingSoon} />
					        <Route exact path="/project/edit/:_projectId" component={ProjectEdit} />

					        <Route exact path="/project/:_projectId" component={Project} />

					        <Route component={NoMatch}/>
					    </Switch>
					</div>
				</ProjectsContext.Provider>
				
			</div>
		);			
	}
};

export default ProjectSwitch;