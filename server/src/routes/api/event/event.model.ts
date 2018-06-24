'use strict';

import { Document, Schema, Model, model } from 'mongoose';


export interface IEvent {
    title: string;
    start_date: Date;
    end_date: Date;
    details: string;
    discontinued: boolean;
}

export interface IEventModel extends IEvent, Document {
}

const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    details: {
        type: String,
        default: '',
    },
    discontinued: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

export const Event: Model<IEventModel> = model<IEventModel>('Event', EventSchema);

export default Event;