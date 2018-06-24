'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var event_model_1 = require("./event.model");
function EventItemController() { }
;
// Creates Event Item.
EventItemController.prototype.createEventItem = function (req, res, next) {
    var newEventDoc;
    if ('body' in req) {
        if ('title' in req.body) {
            newEventDoc.title = req.body.title;
        }
        else {
            var error_1 = new Error('missing title');
            error_1.message = 'BadRequestError';
            return next(error_1);
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
    }
    else {
        var error = new Error('missing body');
        error.name = 'BadRequestError';
        return next(error);
    }
    var query = event_model_1.Event.create(newEventDoc);
    query.then(function (eventItemDoc) {
        res.status(200).json({ _id: eventItemDoc._id });
    }).catch(function (error) {
        console.log(error);
        next(error);
    });
};
// one get returns shops name
EventItemController.prototype.getEventItem = function (req, res, next) {
    var query = event_model_1.Event.findOne({ _id: req.params._eventItemId });
    var vaildFields = [];
    var requestedFields = req.query.field || [];
    var selectFields = ['_id', 'title', 'start_date', 'end_date', 'details', 'createdAt', 'updatedAt', 'discontinued'];
    requestedFields.forEach(function (field) {
        if (vaildFields.includes(field) && !selectFields.includes(field)) {
            selectFields.push(field);
        }
    });
    query.select(selectFields.join(' '));
    query.then(function (eventItemDoc) {
        res.status(200).json(eventItemDoc);
    }).catch(function (error) {
        return next(error);
    });
};
// get list of shop items and returns them and a link for the next
EventItemController.prototype.getEventItems = function (req, res, next) {
    var query = event_model_1.Event.find({});
    if ('discontinued' in req.query) {
        query.where('discontinued').equals(req.query.discontinued);
    }
    if (!('old' in req.query)) {
        query.where('end_date').gte(Date.now());
    }
    query.select('_id');
    query.then(function (eventItemsDocs) {
        var page = !Number.isNaN(Number(req.query.page)) ? Math.abs(Number(req.query.page)) : 1;
        var limit = !Number.isNaN(Number(req.query.limit)) ? Math.abs(Number(req.query.limit)) : 200;
        var eventItemsLimited = eventItemsDocs.slice(limit * (page - 1), limit * (page - 1) + limit);
        var eventItems = [];
        eventItemsLimited.forEach(function (eventItemDocs) {
            eventItems.push(eventItemDocs._id);
        });
        var total = eventItemsDocs.length;
        var pageTotal = eventItemsLimited.length;
        var totalPages = Math.round(total / limit);
        var res_body = {
            page: page,
            totalPages: totalPages,
            pageLimit: limit,
            total: total,
            totalBatch: pageTotal,
            eventItems: eventItems,
        };
        res.status(200).json(res_body);
    }).catch(function (error) {
        return next(error);
    });
};
// Update Event queries: _id update: title, start_date returns: new shop item 
EventItemController.prototype.updateEventItem = function (req, res, next) {
    var changes;
    if ('body' in req) {
        if (!('_id' in req.body)) {
            var error = new Error('missing _id');
            error.name = 'BadRequestError';
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
        console.log(req.body);
        if ('details' in req.body) {
            changes.details = req.body.details;
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
    var query = event_model_1.Event.findOneAndUpdate({ _id: req.body._id }, { $set: changes }, { new: true });
    query.then(function (eventItemDoc) {
        res.status(200).json(eventItemDoc);
    }).catch(function (error) {
        next(error);
    });
};
exports.default = EventItemController.prototype;
