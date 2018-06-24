'use strict';

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import {Redirect} from "react-router-dom";
import Datetime from 'react-datetime';
import moment from 'moment';
import eventActions from '../../actions/event.actions.js';

class EventItemEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	required: false,
        	title: null,
        	start_date: null,
        	end_date: null,
        	details: RichTextEditor.createEmptyValue(),
        	discontinued: false,
        };

		this.hitKey = this.hitKey.bind(this);
		this.editField = this.editField.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.startDateChanged = this.startDateChanged.bind(this);
		this.endDateChanged = this.endDateChanged.bind(this);
		this.updateEventItem = this.updateEventItem.bind(this);
		this.updateEventItemResult = this.updateEventItemResult.bind(this);
		this.onRichTextChange = this.onRichTextChange.bind(this);
		this.redirect = this.redirect.bind(this);
    }

    componentWillMount() {
    	let _state = this.state;
    	_state.title = this.props.title;
    	_state.start_date = moment(this.props.start_date);
    	_state.end_date = moment(this.props.end_date);
    	_state.details = RichTextEditor.createValueFromString(this.props.details, 'html');
    	_state.discontinued = this.props.discontinued;
        this.setState(_state);
    }

	componentDidUpdate(prevProps, prevState) {
		let propsToCheck = ['title', 'start_date', 'end_date', 'details', 'discontinued'];
		let _state = null;
		let _this = this;
		propsToCheck.forEach(function(propToCheck) {
			if (prevProps[propToCheck] !== _this.props[propToCheck]) {
				_state = _state == null ? _this.state : _state;
				_state[propToCheck] = _this.props[propToCheck];
				if (propToCheck == 'details') {
					_state[propToCheck] = RichTextEditor.createValueFromString(_this.props[propToCheck], 'html');
				}
			}
		})
		if (_state) {
			this.setState(_state);
		}
	}

    componentDidMount() {
    	this.props.dispatch(eventActions.getEventItem(this.props._eventItemId));
    }

    editField(e) {
        let _state = this.state;
        _state[e.target.name] = e.target.value;
        this.setState(_state);
    }

    handleCheckboxChange(e) {
        let _state = this.state;
        _state[e.target.name] = e.target.checked;
        this.setState(_state);
    }

    startDateChanged(momentDateTime) {
    	let _state = this.state;
    	_state.start_date = momentDateTime;
    	this.setState(_state);
    }

    endDateChanged(momentDateTime) {
    	let _state = this.state;
    	_state.end_date = momentDateTime;
    	this.setState(_state);
    }

	hitKey(event) {
		if (event.key == 'Enter') {
            this.updateEventItem();
        }
	}

    updateEventItem(e) {
		e.preventDefault();

		let title = this.state.title;
		let start_date = this.state.start_date;
		let end_date = this.state.end_date;
		let details = this.state.details;
		let discontinued = this.state.discontinued;

		if (!title || !start_date || !end_date) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
			return;
		}

		if (start_date > end_date) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
			return;
		}
		const changes = {};
		changes.title = title;
		changes.start_date = start_date;
		changes.end_date = end_date;
		changes.details = details.toString('html');
		changes.discontinued = discontinued;

		this.props.dispatch(eventActions.updateEventItem(changes, this.props, this.updateEventItemResult));
    }

    updateEventItemResult(error) {
    	if (error) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
    	} else {
			this.redirect();
    	} 
    }

    onRichTextChange(value) {
    	console.log(value);
    	let _state = this.state;
		_state.details = value;
		this.setState(_state);
    }

	redirect() {
		let _state = this.state;
		_state.redirect = true;
		this.setState(_state);
	}

	render() {
		if (this.state.redirect) {
			return (<Redirect to={'/event/item/'+this.props._eventItemId} />);
		}

		if (!this.props.adminAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: this.props.location.pathname}}}/>)
		}


		return (
			<div className="event-item-edit-wrapper" >
				<form onSubmit={this.updateEventItem}>
					<h3>EDIT ITEM</h3>
					<label>Title{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<input type='text' onKeyPress={this.hitkey} placeholder="Great Event" onChange={this.editField} name='title' value={this.state.title} />
					<br/>
					<label>Start{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<Datetime value={this.state.start_date} onChange={this.startDateChanged} />
					<br/>
					<label>End{this.state.required ? (<span className="errortext" >* End needs to be at or after Start</span>) : ''}</label>
					<br/>
					<Datetime value={this.state.end_date} onChange={this.endDateChanged} />
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
					<input type='submit' onClick={this.updateEventItem} value='SAVE' />
				</form>	
			</div>
		);			
	}
};

export default EventItemEdit;