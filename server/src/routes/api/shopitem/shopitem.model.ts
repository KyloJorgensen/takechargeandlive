'use strict';

import { Document, Schema, Model, model } from 'mongoose';
import {plugin as diffHistoryPlugin } from 'mongoose-diff-history/diffHistory'

export interface IShopItem {
    name: string;
    price: number;
    stock: number;
    sold: number;
    created_by: string;
    updated_by: string;
    discontinued: boolean;
}

export interface IShopItemModel extends IShopItem, Document {
}

const ShopItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        get: v => Math.round(parseFloat(v)*100)/100,
        set: v => Math.round(parseFloat(v)*100)/100,
        default: 0,
    },
    stock: {
        type: Number,
        min: 0,
        get: v => Math.round(v),
        set: v => Math.round(v),
        default: 0,
    },
    sold: {
        type: Number,
        min: 0,
        get: v => Math.round(v),
        set: v => Math.round(v),
        default: 0,
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
});

ShopItemSchema.plugin(diffHistoryPlugin);

export const ShopItem: Model<IShopItemModel> = model<IShopItemModel>('ShopItem', ShopItemSchema);

export default ShopItem;