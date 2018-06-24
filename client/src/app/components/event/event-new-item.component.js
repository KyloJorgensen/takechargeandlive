'use strict';

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import {Redirect} from "react-router-dom";
import Datetime from 'react-datetime';
import eventActions from '../../actions/event.actions';

class EventNewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	_eventItemId: false,
        	required: false,
        	title: null,
        	start_date: Date.now(),
        	end_date: Date.now(),
        	details: RichTextEditor.createEmptyValue(),
        };

		this.hitKey = this.hitKey.bind(this);
		this.startDateChanged = this.startDateChanged.bind(this);
		this.endDateChanged = this.endDateChanged.bind(this);
		this.addNewEventItem = this.addNewEventItem.bind(this);
		this.addNewEventItemResult = this.addNewEventItemResult.bind(this);
		this.onRichTextChange = this.onRichTextChange.bind(this);
		this.redirect = this.redirect.bind(this);
    }

    componentWillUnmount() {
    	if ('title' in this.refs) {
    		this.refs.title.value = '';
    	}
    	if ('start_date'in this.refs) {
    		this.refs.start_date.value = '';
    	}
    	if ('end_date'in this.refs) {
    		this.refs.end_date.value = '';
    	}
	}

	hitKey(event) {
		if (event.key == 'Enter') {
            this.addNewEventItem();
        }
	}

    startDateChanged(momentDateTime) {
    	console.log(momentDateTime);
    	let _state = this.state;
    	_state.start_date = momentDateTime;
    	this.setState(_state);
    }

    endDateChanged(momentDateTime) {
    	console.log(momentDateTime);
    	let _state = this.state;
    	_state.end_date = momentDateTime;
    	this.setState(_state);
    }

    addNewEventItem(e) {
		e.preventDefault();
		console.log(this.state.start_date, this.state.end_date);
		let title = this.refs.title.value;
		let start_date = this.state.start_date;
		let end_date = this.state.end_date;
		let details = this.state.details;
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
			return
		}

		this.props.dispatch(eventActions.addEventItem(title, start_date, end_date, details.toString('html'), this.addNewEventItemResult));
		let _state = this.state;
		_state.required = false;
		this.setState(_state);
    }

    addNewEventItemResult(error, _eventItemId) {
    	if (error) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
    	} else {
			let _state = this.state;
			_state._eventItemId = _eventItemId;
			this.setState(_state);
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
			return (<Redirect to='/event' />);
		}
		if (this.state._eventItemId) {
			return (<Redirect to={'/event/item/'+this.state._eventItemId} />);
		}
		if (!this.props.adminAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: this.props.location.pathname}}}/>)
		}
	
		return (
			<div className="event-new-item-wrapper" >
				<form onSubmit={this.addNewEventItem}>
					<h3>New Event</h3>
					<label>Title{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<input type='text' onKeyPress={this.hitkey} placeholder="Great Event" ref='title' />
					<br/>
					<label>Start{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<Datetime onChange={this.startDateChanged} value={this.state.start_date} />
					<br/>
					<label>End{this.state.required ? (<span className="errortext" >*End needs to be at or after Start</span>) : ''}</label>
					<br/>
					<Datetime onChange={this.endDateChanged} value={this.state.end_date} />
					<br/>
					<label>Details</label>
					<br/>
					<RichTextEditor value={this.state.details} onChange={this.onRichTextChange} />
					<br/>
					<input type='submit' onClick={this.addNewEventItem} value='SAVE' />
				</form>	
			</div>
		);			
	}
};

export default EventNewItem;