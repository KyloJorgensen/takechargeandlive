'use strict';

import formidable from 'formidable';
import * as path from 'path';
import { sync as mkdirpSync } from 'mkdirp';
import { Image, IImageModel } from './image.model';
import { IMAGE_DIR } from '../../../config/variables.express';


function ImageController() {};

// Creates Image Item.
ImageController.prototype.createImage = function(req, res, next) {
    let newImageDoc: IImageModel;

    if ('body' in req) {
        if ('name' in req.body) {
            newImageDoc.name = req.body.name;
        } else {
            var error = new Error('missing name');
            error.name = 'BadRequestError'
            return next(error);
        }
        if ('alt' in req.body) {
            newImageDoc.alt = req.body.alt;
        } 
        if ('discontinued' in req.body) {
            newImageDoc.discontinued = req.body.discontinued;
        }
    } else {
        var error = new Error('missing body');
        error.name = 'BadRequestError';
        return next(error);
    }

    if ('files' in req) {
        if ('image' in req.files) {
            let { image } = req.files;
            newImageDoc.originalName = image.name;
            const types = ['jpeg','jpg','png','gif',];
            if (!(types.includes(image.name.split('.').pop().toLowerCase()))) {
                var error = new Error('bad image type');
                error.message = 'BadRequestError'
                return next(error);
            }
        } else {
            var error = new Error('missing image');
            error.message = 'BadRequestError'
            return next(error);
        }
    } else {
        var error = new Error('missing files');
        error.name = 'BadRequestError';
        return next(error);
    }

    let query = Image.create(newImageDoc);

    query.then(function(imageDoc) {

        let { image } = req.files;
        let imageDir = IMAGE_DIR;

        let fileLocationName = path.join( imageDir , 'site' , imageDoc.filename.split('.')[0].slice(0, -4) );

        let mkdirpresult = mkdirpSync(fileLocationName);

        fileLocationName = path.join(fileLocationName, imageDoc.filename);

        // Use the mv() method to place the file somewhere on your server
        image.mv(fileLocationName, function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).json({_id: imageDoc._id}); 
        });
    }).catch(function(error) {
        console.log(error)
        next(error);
    });
};

// one get returns shops name
ImageController.prototype.getImage = function(req, res, next) {
    let query = Image.findOne({_id: req.params._imageId});
    let vaildFields = [];
    let requestedFields = req.query.field || [];
    let selectFields = ['_id', 'name', 'alt', 'filename', 'discontinued'];
    requestedFields.forEach(function(field) {
        if ( vaildFields.includes(field) && !selectFields.includes(field)) {
            selectFields.push(field);
        }
    });
    query.select(selectFields.join(' '));
    query.then(function(imageDoc) {
        res.status(200).json(imageDoc);
    }).catch(function(error) {
        return next(error);
    });
};

// get list of shop items and returns them and a link for the next
ImageController.prototype.getImages = function(req, res, next) {  
    let query = Image.find({});
    if ('discontinued' in req.query) {   
        query.where('discontinued').equals(req.query.discontinued);
    }
    query.select('_id');
    query.then(function(imagesDocs) {
        let page = !Number.isNaN(Number(req.query.page)) ? Math.abs(Number(req.query.page)) : 1;
        let limit = !Number.isNaN(Number(req.query.limit)) ? Math.abs(Number(req.query.limit)) : 200;
        let imagesLimited = imagesDocs.slice(limit*(page-1), limit*(page-1)+limit);
        let images = []; 
        imagesLimited.forEach(function(imageDocs) {
            images.push(imageDocs._id);
        })
        let total = imagesDocs.length;
        let pageTotal = imagesLimited.length;
        let totalPages = Math.round(total/limit);
        let res_body = {
            page: page,
            totalPages: totalPages,
            pageLimit: limit,
            total: total,
            totalBatch: pageTotal,
            images: images,
        };
        res.status(200).json(res_body);
    }).catch(function(error) {
        return next(error);
    });
};

// Update Image queries: _id update: name, start_date returns: new shop item 
ImageController.prototype.updateImage = function(req, res, next) {
    let changes: IImageModel;
    if ('body' in req) {
        if (!('_id' in req.body)) {        
            var error = new Error('missing _id');
            error.name = 'BadRequestError'
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
    } else {
        var error = new Error('missing body');
        error.name = 'BadRequestError'
        return next(error);
    }

    if ('files' in req) {
        if (req.files != null) {
            if ('image' in req.files) {
                let { image } = req.files;
                // changes.originalName = image.name;
                const types = ['jpeg','jpg','png','gif',];
                const extenstion = image.name.split('.').pop().toLowerCase();
                if (!types.includes(extenstion)) {
                    var error = new Error('bad image type');
                    error.message = 'BadRequestError'
                    return next(error);
                }
            }
        }
    }

    let query = Image.findOneAndUpdate({_id: req.body._id}, {$set: changes}, {new: true});
    query.then(function(imageDoc) {
        if (imageDoc == null) {
            return res.status(404).end();
        }

        if ('files' in req) {
            if (req.files != null) {
                if ('image' in req.files) {
                    let { image } = req.files;
                    imageDoc.originalName = image.name;
                    imageDoc.markModified('originalName');
                    return imageDoc.save(function (error, imageDoc) {
                        if (error) {
                            return next(error);
                        }

                        let fileLocationName = path.join( IMAGE_DIR , 'site' , imageDoc.filename.split('.')[0].slice(0, -4) );

                        let mkdirpresult = mkdirpSync(fileLocationName);

                        fileLocationName = path.join(fileLocationName, imageDoc.filename);

                        // Use the mv() method to place the file somewhere on your server
                        return image.mv(fileLocationName, function(error) {
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
    }).catch(function(error) {
        next(error);
    });
};

export default ImageController.prototype;