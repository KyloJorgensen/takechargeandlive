'use strict';

import actions from '../actions/shop.actions';

const shopInitialState = {
    shopItemsDisplay: null,
    shopItemList: null,
    shopItemListLength: null,
    shopItemsPage: null,
    shopItemsTotalPages: null,
    shopItemsPageLimit: null,
    shopItemsTotal: null,
    shopItemsTotalBatch: null,
};

const shopReducer = function(state, action) {
    state = state || shopInitialState;
    const _state = state;
    if (action.type === actions.GET_SHOP_ITEMS_SUCCESS) {
        _state.shopItemsDisplay = action.shopItems;
        // _state.shopItemList = action.shopItems;

        _state.shopItemsPage = action.shopItemsPage; 
        _state.shopItemsTotalPages = action.shopItemsTotalPages; 
        _state.shopItemsPageLimit = action.shopItemsPageLimit; 
        _state.shopItemsTotal = action.shopItemsTotal; 
        _state.shopItemsTotalBatch = action.shopItemsTotalBatch; 
        // _state.shopItems = action.shopItems; 
    }    
    if (action.type === actions.GET_SHOP_ITEMS_ERROR) {
        _state.shopItemList = null;
        _state.shopItemsPage = null;
        _state.shopItemsTotalPages = null;
        _state.shopItemsPageLimit = null;
        _state.shopItemsTotal = null;
        _state.shopItemsTotalBatch = null;
    }
    if (action.type === actions.GET_SHOP_ITEM_SUCCESS) {
        _state.shopItemList = _state.shopItemList || {};
        _state.shopItemList[action._id] = {
            _id: action._id,
            name: action.name,
            price: action.price,
            stock: action.stock,
            sold: action.sold,
        }; 
    }    
    if (action.type === actions.GET_SHOP_ITEM_ERROR) {
        console.error(action.error);
    }
    if (_state.shopItemList !== null) {
    	_state.shopItemListLength = Object.keys(_state.shopItemList).length;
    }
    return _state;
};

export default shopReducer;