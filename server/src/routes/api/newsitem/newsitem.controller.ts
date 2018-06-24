'use strict';

import { NewsItem, INewsItemModel } from './newsitem.model';

function NewsItemController() {};

// Creates NewsItem Item.
NewsItemController.prototype.createNewsItem = function(req, res, next) {
    let newNewsItem: INewsItemModel;
    if ('body' in req) {
        if ('post' in req.body) {
            newNewsItem.post = req.body.post;
        } else {
            var error = new Error('missing post');
            error.name = 'BadRequestError'
            return next(error);
        }
        if ('discontinued' in req.body) {
            newNewsItem.discontinued = req.body.discontinued;
        }
    } else {
        var error = new Error('missing body');
        error.name = 'BadRequestError'
        return next(error);
    }
    newNewsItem.created_by = req.session._userId;
    newNewsItem.updated_by = req.session._userId;

    let query = NewsItem.create(newNewsItem);
    query.then(function(newsItemDoc) {
        res.status(200).json({_id: newsItemDoc._id});    
    }).catch(function(error) {
        console.log(error)
        next(error);
    });
};

// one get returns newss post
NewsItemController.prototype.getNewsItem = function(req, res, next) {
    let query = NewsItem.findOne({_id: req.params._newsItemId});

    let vaildFields = [];
    let requestedFields = req.query.field || [];
    let selectFields = ['_id', 'post', 'createdAt', 'updatedAt', 'discontinued'];
    requestedFields.forEach(function(field) {
        if ( vaildFields.includes(field) && !selectFields.includes(field)) {
            selectFields.push(field);
        }
    });
    query.select(selectFields.join(' '));
    query.then(function(newsItemDoc) {
        res.status(200).json(newsItemDoc);
    }).catch(function(error) {
        return next(error);
    });
};

// get list of news items and returns them and a link for the next
NewsItemController.prototype.getNewsItems = function(req, res, next) {
    let discontinued = false;
  
    let query = NewsItem.find({});
    if ('discontinued' in req.query) {   
        query.where('discontinued').equals(req.query.discontinued);
    }
    query.select('_id');
    query.sort('-createdAt')
    query.then(function(newsItemsDocs) {
        let page = !Number.isNaN(Number(req.query.page)) ? Math.abs(Number(req.query.page)) : 1;
        let limit = !Number.isNaN(Number(req.query.limit)) ? Math.abs(Number(req.query.limit)) : 200;
        let newsItemsLimited = newsItemsDocs.slice(limit*(page-1), limit*(page-1)+limit);
        let newsItems = []; 
        newsItemsLimited.forEach(function(newsItem) {
            newsItems.push(newsItem._id);
        })
        let total = newsItemsDocs.length;
        let pageTotal = newsItemsLimited.length;
        let totalPages = Math.round(total/limit);
        let res_body = {
            page: page,
            totalPages: totalPages,
            pageLimit: limit,
            total: total,
            totalBatch: pageTotal,
            newsItems: newsItems,
        };
        res.status(200).json(res_body);
    }).catch(function(error) {
        return next(error);
    });
};
// Update NewsItem queries: _id update: post, price returns: new news item 
NewsItemController.prototype.updateNewsItem = function(req, res, next) {
    let changes: INewsItemModel;
    if ('body' in req) {
        if (!('_id' in req.body)) {        
            var error = new Error('missing _id');
            error.name = 'BadRequestError'
            return next(error);
        }        
        if ('post' in req.body) {
            changes.post = req.body.post;
        }
        if ('discontinued' in req.body) {
            changes.discontinued = req.body.discontinued;
        }
    } else {
        var error = new Error('missing body');
        error.name = 'BadRequestError'
        return next(error);
    }
    changes.updated_by = req.session._userId;

    let query = NewsItem.findOneAndUpdate({_id: req.body._id}, {$set: changes}, {new: true});
    query.then(function(newsItemDoc) {
        res.status(200).json(newsItemDoc);    
    }).catch(function(error) {
        next(error);
    });
};

export default NewsItemController.prototype;