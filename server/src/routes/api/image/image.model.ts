'use strict';

import { Document, Schema, Model, model } from 'mongoose';

export interface ICounter {
    type: string;
    seq: number;
}

export interface ICounterModel extends ICounter, Document {
}

const CounterSchema = new Schema({
    type: {
        type: String,
        unique: true,
        required: true
    },
    seq: {
        type: Number, 
        default: 0 
    }
});

export const Counter: Model<ICounterModel> = model<ICounterModel>('Counter', CounterSchema);


export interface IImage {
    name: string;
    src?: string;
    alt?: string;
    originalSrc?: string;
    originalName: string;
    filename?: string;
    secure: boolean;
    discontinued: boolean;
}

export interface IImageModel extends IImage, Document {
}

const ImageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    src: {
        type: String,
    },
    alt: {
        type: String,
    },
    originalSrc: {
        type: String,
    },
    originalName: {
        type: String,
        required: true,
    },
    filename: {
        type: String
    },
    secure: {
        type: Boolean,
        default: false
    },
    discontinued: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

const pad = (n: number | string, width:10, z?: string): string => {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

ImageSchema.pre('save', function(next) {
    var doc: any = this;
    Counter.findByIdAndUpdate({type: 'imageId'}, {$inc: { seq: 1} }, {upsert: true, setDefaultsOnInsert: true}, function(error, counter)   {
        if(error)
            return next(error);
        doc.filename = pad(counter.seq, 10) + '.' + doc.originalName.split('.').pop().toLowerCase();
        next();
    });

});

export const Image: Model<IImageModel> = model<IImageModel>('Image', ImageSchema);