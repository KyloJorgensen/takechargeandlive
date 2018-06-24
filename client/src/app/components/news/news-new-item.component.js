'use strict';

import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import {Redirect} from "react-router-dom";
import newsActions from '../../actions/news.actions.js';

class NewsNewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	post: RichTextEditor.createEmptyValue(),
        	_newsItemId: false,
        	required: false,
        };

		this.addNewNewsItem = this.addNewNewsItem.bind(this);
		this.addNewNewsItemResult = this.addNewNewsItemResult.bind(this);
		this.redirect = this.redirect.bind(this);
		this.onRichTextChange = this.onRichTextChange.bind(this);
    }

    addNewNewsItem(e) {
		e.preventDefault();
		let post = this.state.post;
		if (!post) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
			return;
		}
		this.props.dispatch(newsActions.addNewsItem(post.toString('html'), this.addNewNewsItemResult));

		let _state = this.state;
		_state.required = false;
		this.setState(_state);
    }

    addNewNewsItemResult(error, _newsItemId) {
    	if (error) {
			let _state = this.state;
			_state.required = true;
			this.setState(_state);
    	} else {
			let _state = this.state;
			_state._newsItemId = _newsItemId;
			this.setState(_state);
    	} 
    }

    onRichTextChange(value) {
    	console.log(value);
    	let _state = this.state;
		_state.post = value;
		this.setState(_state);
    }

	redirect() {
		let _state = this.state;
		_state.redirect = true;
		this.setState(_state);
	}

	render() {
		if (this.state.redirect) {
			return (<Redirect to='/news' />);
		}
		if (this.state._newsItemId) {
			return (<Redirect to={'/news/item/'+this.state._newsItemId} />);
		}
		if (!this.props.adminAccess) {
			return (<Redirect to={{pathname: '/login', state: {redirectPath: this.props.location.pathname}}}/>)
		}
	
		return (
			<div className="news-new-item-wrapper" >
				<form onSubmit={this.addNewNewsItem}>
					<h3>New Item</h3>
					<label>Post{this.state.required ? (<span className="errortext" >* Needs to have something in the text field below.</span>) : ''}</label>
					<br/>
					<RichTextEditor value={this.state.post} onChange={this.onRichTextChange} />
					<input type='submit' onClick={this.addNewNewsItem} value='SAVE' />
				</form>	
			</div>
		);			
	}
};

export default NewsNewItem;