'use strict';

import actions from '../actions/news.actions';
import moment from 'moment';

const newsInitialState = {
    newsItemsDisplay: null,
    newsItemList: null,
    newsItemListLength: null,
    newsItemsPage: null,
    newsItemsTotalPages: null,
    newsItemsPageLimit: null,
    newsItemsTotal: null,
    newsItemsTotalBatch: null,
};

const newsReducer = function(state, action) {
    state = state || newsInitialState;
    const _state = state;
    if (action.type === actions.GET_NEWS_ITEMS_SUCCESS) {
        _state.newsItemsDisplay = action.newsItems;
        // _state.newsItemList = action.newsItems;

        _state.newsItemsPage = action.newsItemsPage; 
        _state.newsItemsTotalPages = action.newsItemsTotalPages; 
        _state.newsItemsPageLimit = action.newsItemsPageLimit; 
        _state.newsItemsTotal = action.newsItemsTotal; 
        _state.newsItemsTotalBatch = action.newsItemsTotalBatch; 
        // _state.newsItems = action.newsItems; 
    }    
    if (action.type === actions.GET_NEWS_ITEMS_ERROR) {
        _state.newsItemList = null;
        _state.newsItemsPage = null;
        _state.newsItemsTotalPages = null;
        _state.newsItemsPageLimit = null;
        _state.newsItemsTotal = null;
        _state.newsItemsTotalBatch = null;
    }
    if (action.type === actions.GET_NEWS_ITEM_SUCCESS) {
        _state.newsItemList = _state.newsItemList || {};
        let createDateTime = moment(action.createdAt);
        let updatedDateTime = moment(action.updatedAt);

        let daymessages = {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'MM/DD/YYYY',
        };

        let createdDay = createDateTime.calendar(null, daymessages);
        let updatedDay = updatedDateTime.calendar(null, daymessages);

        let createdTime = createDateTime.format("h:mm a");
        let updatedTime = updatedDateTime.format("h:mm a");

        let createdUpdatedDateTime = 'Created ';
        if (createdDay !== 'Today' && createdDay !== 'Yesterday') {
            createdUpdatedDateTime += 'on '
        }
        createdUpdatedDateTime +=  createdDay + ' at ' + createdTime;

        if (createdDay !== updatedDay) {
            createdUpdatedDateTime += ' Updated '
            if (updatedDay !== 'Today' && updatedDay !== 'Yesterday') {
                createdUpdatedDateTime += 'on ';
            }
            createdUpdatedDateTime += updatedDay + ' at ' + updatedTime;

        } else if (createdTime !== updatedTime) {
            createdUpdatedDateTime += ' Updated at ' + updatedTime;
        }        

        _state.newsItemList[action._id] = {
            _id: action._id,
            post: action.post,
            createdUpdatedDateTime: createdUpdatedDateTime,
        }; 
    }    
    if (action.type === actions.GET_NEWS_ITEM_ERROR) {
        console.error(action.error);
    }
    if (_state.newsItemList !== null) {
    	_state.newsItemListLength = Object.keys(_state.newsItemList).length;
    }
    return _state;
};

export default newsReducer;