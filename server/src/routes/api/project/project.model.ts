'use strict';


import { Document, Schema, Model, model } from 'mongoose';

export interface ICoverImage {
    _imageId: Schema.Types.ObjectId;
}

export interface ICoverImageModel extends ICoverImage, Document {
}

const CoverImageSchema = new Schema({
    _imageId: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
    },
}, {timestamps: true});

export interface IPage {
    _imageId: Schema.Types.ObjectId;
    title: string;
    details: string;
    page: number;
    discontinued: Boolean;
}

export interface IPageModel extends IPage, Document {
}

const PageSchema = new Schema({
    _imageId: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
    },
    title: {
        type: String,
        default: '',
    },
    details: {
        type: String,
        default: '',
    },
    page: {
        type: Number,
    },
    discontinued: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

export interface IProject {
    title: string;
    year: Date;
    details: string;
    coverImage: ICoverImageModel;
    pages: IPageModel[];
    discontinued: Boolean;
}

export interface IProjectModel extends IProject, Document {
}

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Date,
        required: true,
    },
    details: {
        type: String,
        default: '',
    },
    coverImage: CoverImageSchema,
    pages: [PageSchema],
    discontinued: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

export const Project: Model<IProjectModel> = model<IProjectModel>('Project', ProjectSchema);

export default Project; 