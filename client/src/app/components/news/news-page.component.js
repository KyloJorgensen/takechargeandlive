'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NewsList from './news-list.container.js';

class NewsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	discontinued: false,
        };

		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(e) {
        let _state = this.state;
        _state[e.target.name] = e.target.checked;
        this.setState(_state);
    }

	render() {
        let adminOptions = this.props.adminAccess ? (
            <div>
                <h5>Admin Options</h5>
                <label>Discontinued</label><input type='checkbox' checked={!!this.state.discontinued} name="discontinued" onChange={this.handleCheckboxChange} />
            </div>
        ) : '';

		return (
			<div className="news-wrapper" >
				{adminOptions}
				<NewsList discontinued={this.state.discontinued} />
			</div>
		);			
	}
};

export default NewsPage;