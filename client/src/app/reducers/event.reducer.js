'use strict';

import actions from '../actions/event.actions';
import moment from 'moment';

const eventInitialState = {
    eventItemsDisplay: null,
    eventItemList: null,
    eventItemListLength: null,
    eventItemsPage: null,
    eventItemsTotalPages: null,
    eventItemsPageLimit: null,
    eventItemsTotal: null,
    eventItemsTotalBatch: null,
};

const eventItemReducer = function(state, action) {
    state = state || eventInitialState;
    const _state = state;
    if (action.type === actions.GET_EVENT_ITEMS_SUCCESS) {
        _state.eventItemsDisplay = action.eventItems;
        // _state.eventItemList = action.eventItems;

        _state.eventItemsPage = action.eventItemsPage; 
        _state.eventItemsTotalPages = action.eventItemsTotalPages; 
        _state.eventItemsPageLimit = action.eventItemsPageLimit; 
        _state.eventItemsTotal = action.eventItemsTotal; 
        _state.eventItemsTotalBatch = action.eventItemsTotalBatch; 
        // _state.eventItems = action.eventItems; 
    }    
    if (action.type === actions.GET_EVENT_ITEMS_ERROR) {
        _state.eventItemList = null;
        _state.eventItemsPage = null;
        _state.eventItemsTotalPages = null;
        _state.eventItemsPageLimit = null;
        _state.eventItemsTotal = null;
        _state.eventItemsTotalBatch = null;
    }
    if (action.type === actions.GET_EVENT_ITEM_SUCCESS) {
        _state.eventItemList = _state.eventItemList || {};

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

        _state.eventItemList[action._id] = {
            _id: action._id,
            title: action.title,
            start_date: action.start_date,
            end_date: action.end_date,
            details: action.details,
            createdUpdatedDateTime: createdUpdatedDateTime,
            discontinued: action.discontinued,
        };
    }    
    if (action.type === actions.GET_EVENT_ITEM_ERROR) {
        console.error(action.error);
    }
    if (_state.eventItemList !== null) {
    	_state.eventItemListLength = Object.keys(_state.eventItemList).length;
    }
    return _state;
};

export default eventItemReducer;