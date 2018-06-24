'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var mkdirp_1 = require("mkdirp");
var image_model_1 = require("./image.model");
var variables_express_1 = require("../../../config/variables.express");
function ImageController() { }
;
// Creates Image Item.
ImageController.prototype.createImage = function (req, res, next) {
    var newImageDoc;
    if ('body' in req) {
        if ('name' in req.body) {
            newImageDoc.name = req.body.name;
        }
        else {
            var error = new Error('missing name');
            error.name = 'BadRequestError';
            return next(error);
        }
        if ('alt' in req.body) {
            newImageDoc.alt = req.body.alt;
        }
        if ('discontinued' in req.body) {
            newImageDoc.discontinued = req.body.discontinued;
        }
    }
    else {
        var error = new Error('missing body');
        error.name = 'BadRequestError';
        return next(error);
    }
    if ('files' in req) {
        if ('image' in req.files) {
            var image = req.files.image;
            newImageDoc.originalName = image.name;
            var types = ['jpeg', 'jpg', 'png', 'gif',];
            if (!(types.includes(image.name.split('.').pop().toLowerCase()))) {
                var error = new Error('bad image type');
                error.message = 'BadRequestError';
                return next(error);
            }
        }
        else {
            var error = new Error('missing image');
            error.message = 'BadRequestError';
            return next(error);
        }
    }
    else {
        var error = new Error('missing files');
        error.name = 'BadRequestError';
        return next(error);
    }
    var query = image_model_1.Image.create(newImageDoc);
    query.then(function (imageDoc) {
        var image = req.files.image;
        var imageDir = variables_express_1.IMAGE_DIR;
        var fileLocationName = path.join(imageDir, 'site', imageDoc.filename.split('.')[0].slice(0, -4));
        var mkdirpresult = mkdirp_1.sync(fileLocationName);
        fileLocationName = path.join(fileLocationName, imageDoc.filename);
        // Use the mv() method to place the file somewhere on your server
        image.mv(fileLocationName, function (err) {
            if (err) {
                return next(err);
            }
            res.status(200).json({ _id: imageDoc._id });
        });
    }).catch(function (error) {
        console.log(error);
        next(error);
    });
};
// one get returns shops name
ImageController.prototype.getImage = function (req, res, next) {
    var query = image_model_1.Image.findOne({ _id: req.params._imageId });
    var vaildFields = [];
    var requestedFields = req.query.field || [];
    var selectFields = ['_id', 'name', 'alt', 'filename', 'discontinued'];
    requestedFields.forEach(function (field) {
        if (vaildFields.includes(field) && !selectFields.includes(field)) {
            selectFields.push(field);
        }
    });
    query.select(selectFields.join(' '));
    query.then(function (imageDoc) {
        res.status(200).json(imageDoc);
    }).catch(function (error) {
        return next(error);
    });
};
// get list of shop items and returns them and a link for the next
ImageController.prototype.getImages = function (req, res, next) {
    var query = image_model_1.Image.find({});
    if ('discontinued' in req.query) {
        query.where('discontinued').equals(req.query.discontinued);
    }
    query.select('_id');
    query.then(function (imagesDocs) {
        var page = !Number.isNaN(Number(req.query.page)) ? Math.abs(Number(req.query.page)) : 1;
        var limit = !Number.isNaN(Number(req.query.limit)) ? Math.abs(Number(req.query.limit)) : 200;
        var imagesLimited = imagesDocs.slice(limit * (page - 1), limit * (page - 1) + limit);
        var images = [];
        imagesLimited.forEach(function (imageDocs) {
            images.push(imageDocs._id);
        });
        var total = imagesDocs.length;
        var pageTotal = imagesLimited.length;
        var totalPages = Math.round(total / limit);
        var res_body = {
            page: page,
            totalPages: totalPages,
            pageLimit: limit,
            total: total,
            totalBatch: pageTotal,
            images: images,
        };
        res.status(200).json(res_body);
    }).catch(function (error) {
        return next(error);
    });
};
// Update Image queries: _id update: name, start_date returns: new shop item 
ImageController.prototype.updateImage = function (req, res, next) {
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
        if ('alt' in req.body) {
            changes.alt = req.body.alt;
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
    if ('files' in req) {
        if (req.files != null) {
            if ('image' in req.files) {
                var image = req.files.image;
                // changes.originalName = image.name;
                var types = ['jpeg', 'jpg', 'png', 'gif',];
                var extenstion = image.name.split('.').pop().toLowerCase();
                if (!types.includes(extenstion)) {
                    var error = new Error('bad image type');
                    error.message = 'BadRequestError';
                    return next(error);
                }
            }
        }
    }
    var query = image_model_1.Image.findOneAndUpdate({ _id: req.body._id }, { $set: changes }, { new: true });
    query.then(function (imageDoc) {
        if (imageDoc == null) {
            return res.status(404).end();
        }
        if ('files' in req) {
            if (req.files != null) {
                if ('image' in req.files) {
                    var image_1 = req.files.image;
                    imageDoc.originalName = image_1.name;
                    imageDoc.markModified('originalName');
                    return imageDoc.save(function (error, imageDoc) {
                        if (error) {
                            return next(error);
                        }
                        var fileLocationName = path.join(variables_express_1.IMAGE_DIR, 'site', imageDoc.filename.split('.')[0].slice(0, -4));
                        var mkdirpresult = mkdirp_1.sync(fileLocationName);
                        fileLocationName = path.join(fileLocationName, imageDoc.filename);
                        // Use the mv() method to place the file somewhere on your server
                        return image_1.mv(fileLocationName, function (error) {
                            if (error) {
                                return next(error);
                            }
                            res.status(200).json(imageDoc);
                        });
                    });
                }
            }
        }
        res.status(200).json(imageDoc);
    }).catch(function (error) {
        next(error);
    });
};
exports.default = ImageController.prototype;
