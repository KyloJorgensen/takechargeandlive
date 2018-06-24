'use strict';

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import {Redirect} from "react-router-dom";
import newsActions from '../../actions/news.actions.js';

class NewsItemEdit extends Component {
    constructor(props) {
    	console.log('constructor', props);
        super(props);
        this.state = {
        	redirect: false,
        	required: false,
        	post: RichTextEditor.createEmptyValue(),
        	discontinued: false,
        };

		this.hitKey = this.hitKey.bind(this);
		this.editField = this.editField.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.updateNewsItem = this.updateNewsItem.bind(this);
		this.updateNewsItemResult = this.updateNewsItemResult.bind(this);
		this.onRichTextChange = this.onRichTextChange.bind(this);
		this.redirect = this.redirect.bind(this);
    }

    componentWillMount() {
    	let _state = this.state;
    	_state.post = RichTextEditor.createValueFromString(this.props.post, 'html');
    	_state.discontinued = this.props.discontinued;
        this.setState(_state);
    }

	componentDidUpdate(prevProps, prevState) {
		let propsToCheck = ['post', 'discontinued'];
		let _state = null;
		let _this = this;
		propsToCheck.forEach(function(propToCheck) {
			if (prevProps[propToCheck] !== _this.props[propToCheck]) {
				_state = _state == null ? _this.state : _state;
				_state[propToCheck] = _this.props[propToCheck];
				if (propToCheck == 'post') {
					_state[propToCheck] = RichTextEditor.createValueFromString(_this.props[propToCheck], 'html');
				}
			}
		})
		if (_state) {
			this.setState(_state);
		}
	}

    componentDidMount() {
    	this.props.dispatch(newsActions.getNewsItem(this.props._newsItemId));
    }

    editField(e) {
        let _state = this.state;
        _state[e.target.name] = e.target.value;
        this.setState(_state);
    }

	hitKey(event) {
		if (event.key == 'Enter') {
            this.updateNewsItem();
        }
	}

    updateNewsItem(e) {
		e.preventDefault();
		let _state = this.state;
		_state.post = this.state.post.toString('html');
		this.props.dispatch(newsActions.updateNewsItem(_state, this.props, this.updateNewsItemResult));
    }

    updateNewsItemResult(error) {
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
		_state.post = value;
		this.setState(_state);
    }

    handleCheckboxChange(e) {
        let _state = this.state;
        _state[e.target.name] = e.target.checked;
        this.setState(_state);
    }

	redirect() {
		let _state = this.state;
		_state.redirect = true;
		this.setState(_state);
	}

	render() {
		if (this.state.redirect) {
			return (<Redirect to={'/news/item/'+this.props._newsItemId} />);
		}

		if (!this.props.adminAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: this.props.location.pathname}}}/>)
		}
		return (
			<div className="news-item-edit-wrapper" >
				<form onSubmit={this.updateNewsItem}>
					<h3>EDIT ITEM</h3>
					<label>Post{this.state.required ? (<span className="errortext" >*</span>) : ''}</label>
					<br/>
					<RichTextEditor value={this.state.post} onChange={this.onRichTextChange} />
					<br/>
					<p className='news-created-updated-date-time' >{this.props.createdUpdatedDateTime}</p>
					<label>Discontinued</label>
					<br/>
					<input type='checkbox' checked={!!this.state.discontinued} name="discontinued" onChange={this.handleCheckboxChange} />
					<br/>
					<input type='submit' onClick={this.updateNewsItem} value='SAVE' />
				</form>	
			</div>
		);			
	}
};

export default NewsItemEdit;