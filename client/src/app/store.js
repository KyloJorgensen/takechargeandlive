'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import BrainTreeReducer from './reducers/braintree.reducer';
import ImageReducer from './reducers/image.reducer';
import NewsReducer from './reducers/news.reducer';
import ShopReducer from './reducers/shop.reducer';
import EventReducer from './reducers/event.reducer';
import ProjectReducer from './reducers/project.reducer';
import UserReducer from './reducers/user.reducer';

const initialState = {};

const reducers = function(state, action) {
    state = state || initialState;
    const _state = {};
	_state.braintree = BrainTreeReducer(state.braintree, action);
	_state.image = ImageReducer(state.image, action);
	_state.news = NewsReducer(state.news, action);
	_state.shop = ShopReducer(state.shop, action);
	_state.event = EventReducer(state.event, action);
	_state.project = ProjectReducer(state.project, action);
	_state.user = UserReducer(state.user, action);
    return _state;
};

const store = createStore(reducers, applyMiddleware(thunk));

export default store;