'use strict';

import { Event, IEventModel } from './event.model';

function EventItemController() {};

// Creates Event Item.
EventItemController.prototype.createEventItem = function(req, res, next) {
    let newEventDoc: IEventModel;
    if ('body' in req) {
        if ('title' in req.body) {
            newEventDoc.title = req.body.title;
        } else {
            const error = new Error('missing title');
            error.message = 'BadRequestError'
            return next(error);
        }
        if ('start_date' in req.body) {
            newEventDoc.start_date = req.body.start_date;
        }
        if ('end_date' in req.body) {
            newEventDoc.end_date = req.body.end_date;
        }
        if ('details' in req.body) {
            newEventDoc.details = req.body.details;
        }
        if ('discontinued' in req.body) {
            newEventDoc.discontinued = req.body.discontinued;
        }
    } else {
        var error = new Error('missing body');
        error.name = 'BadRequestError';
        return next(error);
    }

    let query = Event.create(newEventDoc);
    query.then(function(eventItemDoc) {
        res.status(200).json({_id: eventItemDoc._id});    
    }).catch(function(error) {
        console.log(error)
        next(error);
    });
};

// one get returns shops name
EventItemController.prototype.getEventItem = function(req, res, next) {
    let query = Event.findOne({_id: req.params._eventItemId});
    let vaildFields = [];
    let requestedFields = req.query.field || [];
    let selectFields = ['_id', 'title','start_date', 'end_date', 'details', 'createdAt', 'updatedAt', 'discontinued'];
    requestedFields.forEach(function(field) {
        if ( vaildFields.includes(field) && !selectFields.includes(field)) {
            selectFields.push(field);
        }
    });
    query.select(selectFields.join(' '));
    query.then(function(eventItemDoc) {
        res.status(200).json(eventItemDoc);
    }).catch(function(error) {
        return next(error);
    });
};

// get list of shop items and returns them and a link for the next
EventItemController.prototype.getEventItems = function(req, res, next) {  
    let query = Event.find({});
    if ('discontinued' in req.query) {   
        query.where('discontinued').equals(req.query.discontinued);
    }
    if (!('old' in req.query)) {
        query.where('end_date').gte(Date.now());
    }
    query.select('_id');
    query.then(function(eventItemsDocs) {
        let page = !Number.isNaN(Number(req.query.page)) ? Math.abs(Number(req.query.page)) : 1;
        let limit = !Number.isNaN(Number(req.query.limit)) ? Math.abs(Number(req.query.limit)) : 200;
        let eventItemsLimited = eventItemsDocs.slice(limit*(page-1), limit*(page-1)+limit);
        let eventItems = []; 
        eventItemsLimited.forEach(function(eventItemDocs) {
            eventItems.push(eventItemDocs._id);
        })
        let total = eventItemsDocs.length;
        let pageTotal = eventItemsLimited.length;
        let totalPages = Math.round(total/limit);
        let res_body = {
            page: page,
            totalPages: totalPages,
            pageLimit: limit,
            total: total,
            totalBatch: pageTotal,
            eventItems: eventItems,
        };
        res.status(200).json(res_body);
    }).catch(function(error) {
        return next(error);
    });
};
// Update Event queries: _id update: title, start_date returns: new shop item 
EventItemController.prototype.updateEventItem = function(req, res, next) {
    let changes: IEventModel;
    if ('body' in req) {
        if (!('_id' in req.body)) {        
            var error = new Error('missing _id');
            error.name = 'BadRequestError'
            return next(error);
        }
        if ('title' in req.body) {
            changes.title = req.body.title;
        }
        if ('start_date' in req.body) {
            changes.start_date = req.body.start_date;
        }
        if ('end_date' in req.body) {
            changes.end_date = req.body.end_date;
        }
        console.log(req.body)
        if ('details' in req.body) {
            changes.details = req.body.details;
        }
        if ('discontinued' in req.body) {
            changes.discontinued = req.body.discontinued;
        }
    } else {
        var error = new Error('missing body');
        error.name = 'BadRequestError'
        return next(error);
    }

    let query = Event.findOneAndUpdate({_id: req.body._id}, {$set: changes}, {new: true});
    query.then(function(eventItemDoc) {
        res.status(200).json(eventItemDoc);    
    }).catch(function(error) {
        next(error);
    });
};

export default EventItemController.prototype;