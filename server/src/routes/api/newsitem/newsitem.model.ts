'use strict';

import { Document, Schema, Model, model } from 'mongoose';

export interface INewsItem {
    post: string;
    created_by: string;
    updated_by: string;
    discontinued: boolean;
}

export interface INewsItemModel extends INewsItem, Document {
}

var NewsItemSchema = new Schema({
    post: {
        type: String,
        required: true,
    },
    created_by: {
        type: String,
        required: true,
    },
    updated_by: {
        type: String,
        required: true,
    },
    discontinued: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

export const NewsItem: Model<INewsItemModel> = model<INewsItemModel>('NewsItem', NewsItemSchema);

export default NewsItem;