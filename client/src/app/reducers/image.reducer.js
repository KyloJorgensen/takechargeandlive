'use strict';

import actions from '../actions/image.actions';
// import moment from 'moment';

const imageInitialState = {
    imagesDisplay: null,
    imageList: null,
    imageListLength: null,
    imagesPage: null,
    imagesTotalPages: null,
    imagesPageLimit: null,
    imagesTotal: null,
    imagesTotalBatch: null,
};

const imageReducer = function(state, action) {
    state = state || imageInitialState;
    const _state = state;
    if (action.type === actions.GET_IMAGES_SUCCESS) {
        _state.imagesDisplay = action.images;
        // _state.imageList = action.images;

        _state.imagesPage = action.imagesPage; 
        _state.imagesTotalPages = action.imagesTotalPages; 
        _state.imagesPageLimit = action.imagesPageLimit; 
        _state.imagesTotal = action.imagesTotal; 
        _state.imagesTotalBatch = action.imagesTotalBatch; 
        // _state.images = action.images; 
    }    
    if (action.type === actions.GET_IMAGES_ERROR) {
        _state.imageList = null;
        _state.imagesPage = null;
        _state.imagesTotalPages = null;
        _state.imagesPageLimit = null;
        _state.imagesTotal = null;
        _state.imagesTotalBatch = null;
    }
    if (action.type === actions.GET_IMAGE_SUCCESS) {
        _state.imageList = _state.imageList || {};

        // let createDateTime = moment(action.createdAt);
        // let updatedDateTime = moment(action.updatedAt);

        // let daymessages = {
        //     sameDay: '[Today]',
        //     nextDay: '[Tomorrow]',
        //     nextWeek: 'dddd',
        //     lastDay: '[Yesterday]',
        //     lastWeek: '[Last] dddd',
        //     sameElse: 'MM/DD/YYYY',
        // };

        // let createdDay = createDateTime.calendar(null, daymessages);
        // let updatedDay = updatedDateTime.calendar(null, daymessages);

        // let createdTime = createDateTime.format("h:mm a");
        // let updatedTime = updatedDateTime.format("h:mm a");

        // let createdUpdatedDateTime = 'Created ';
        // if (createdDay !== 'Today' && createdDay !== 'Yesterday') {
        //     createdUpdatedDateTime += 'on '
        // }
        // createdUpdatedDateTime +=  createdDay + ' at ' + createdTime;

        // if (createdDay !== updatedDay) {
        //     createdUpdatedDateTime += ' Updated '
        //     if (updatedDay !== 'Today' && updatedDay !== 'Yesterday') {
        //         createdUpdatedDateTime += 'on ';
        //     }
        //     createdUpdatedDateTime += updatedDay + ' at ' + updatedTime;

        // } else if (createdTime !== updatedTime) {
        //     createdUpdatedDateTime += ' Updated at ' + updatedTime;
        // }

        _state.imageList[action._id] = {
            _id: action._id,
            name: action.name,
            alt: action.alt,
            filename: '/images/site/' + action.filename.split('.')[0].slice(0, -4) + '/'+action.filename,
            // start_date: action.start_date,
            // end_date: action.end_date,
            // details: action.details,
            // createdUpdatedDateTime: createdUpdatedDateTime,
            discontinued: action.discontinued,
        };
    }    
    if (action.type === actions.GET_IMAGE_ERROR) {
        console.error(action.error);
    }
    if (_state.imageList !== null) {
    	_state.imageListLength = Object.keys(_state.imageList).length;
    }
    return _state;
};

export default imageReducer;