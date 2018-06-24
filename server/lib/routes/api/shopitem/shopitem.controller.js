'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var shopitem_model_1 = require("./shopitem.model");
function ShopItemController() { }
;
// Creates ShopItem Item.
ShopItemController.prototype.createShopItem = function (req, res, next) {
    var changes;
    if ('body' in req) {
        if ('name' in req.body) {
            changes.name = req.body.name;
        }
        else {
            var error = new Error('missing name');
            error.name = 'BadRequestError';
            return next(error);
        }
        if ('price' in req.body) {
            changes.price = req.body.price;
        }
        if ('stock' in req.body) {
            changes.stock = req.body.stock;
        }
        if ('sold' in req.body) {
            changes.sold = req.body.sold;
        }
        if ('discontinued' in req.body) {
            changes.discontinued = req.body.discontinued;
        }
    }
    else {
        var error = new Error('missing body');
        error.name = 'BadRequestError';
        return next(error);
    }
    changes.created_by = req.session._userId;
    changes.updated_by = req.session._userId;
    var query = shopitem_model_1.ShopItem.create(changes);
    query.then(function (shopItemDoc) {
        res.status(200).json({ _id: shopItemDoc._id });
    }).catch(function (error) {
        console.log(error);
        next(error);
    });
};
// one get returns shops name
ShopItemController.prototype.getShopItem = function (req, res, next) {
    var query = shopitem_model_1.ShopItem.findOne({ _id: req.params._shopItemId });
    var vaildFields = ['price', 'stock'];
    var requestedFields = req.query.field || [];
    var selectFields = ['_id', 'name'];
    requestedFields.forEach(function (field) {
        if (vaildFields.includes(field) && !selectFields.includes(field)) {
            selectFields.push(field);
        }
    });
    query.select(selectFields.join(' '));
    query.then(function (shopItemDoc) {
        res.status(200).json(shopItemDoc);
    }).catch(function (error) {
        return next(error);
    });
};
// get list of shop items and returns them and a link for the next
ShopItemController.prototype.getShopItems = function (req, res, next) {
    var discontinued = false;
    var query = shopitem_model_1.ShopItem.find({});
    // if (!'discontinued' in req.query) {
    //     query.where('discontinued').equals(false);
    // }
    query.select('_id');
    query.then(function (shopItemsDocs) {
        var page = !Number.isNaN(Number(req.query.page)) ? Math.abs(Number(req.query.page)) : 1;
        var limit = !Number.isNaN(Number(req.query.limit)) ? Math.abs(Number(req.query.limit)) : 200;
        var shopItemsLimited = shopItemsDocs.slice(limit * (page - 1), limit * (page - 1) + limit);
        var shopItems = [];
        shopItemsLimited.forEach(function (shopItem) {
            shopItems.push(shopItem._id);
        });
        var total = shopItemsDocs.length;
        var pageTotal = shopItemsLimited.length;
        var totalPages = Math.round(total / limit);
        var res_body = {
            page: page,
            totalPages: totalPages,
            pageLimit: limit,
            total: total,
            totalBatch: pageTotal,
            shopItems: shopItems,
        };
        res.status(200).json(res_body);
    }).catch(function (error) {
        return next(error);
    });
};
// Update ShopItem queries: _id update: name, price returns: new shop item 
ShopItemController.prototype.updateShopItem = function (req, res, next) {
    var changes;
    if ('body' in req) {
        if (!('_id' in req.body)) {
            var error = new Error('missing _id');
            error.name = 'BadRequestError';
            return next(error);
        }
        if ('name' in req.body) {
            changes.name = req.body.name;
        }
        if ('price' in req.body) {
            changes.price = req.body.price;
        }
        if ('stock' in req.body) {
            changes.stock = req.body.stock;
        }
        if ('discontinued' in req.body) {
            changes.discontinued = req.body.discontinued;
        }
    }
    else {
        var error = new Error('missing body');
        error.name = 'BadRequestError';
        return next(error);
    }
    changes.updated_by = req.session._userId;
    var query = shopitem_model_1.ShopItem.findOneAndUpdate({ _id: req.body._id }, { $set: changes }, { new: true });
    query.then(function (shopItemDoc) {
        res.status(200).json(shopItemDoc);
    }).catch(function (error) {
        next(error);
    });
};
exports.default = ShopItemController.prototype;
