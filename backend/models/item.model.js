import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: String, 
        default: '',
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    category: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        enum: ['New', 'Like New', 'Used', 'Heavily Used'],
        required: true,
    },
    listedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    views: {
        type: Number,
        default: 0
    },
    boughtCount: {
        type: Number,
        default: 0
    },
    requestStatus: {
        requested: { type: Number, default: 0 },
        accepted: { type: Number, default: 0 },
        completed: { type: Number, default: 0 },
        declined: { type: Number, default: 0 },
    },
    requests: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        quantity: { type: Number, default: 1 },
        status: {
            type: String,
            enum: ['Requested', 'Accepted', 'Completed', 'Declined'],
            default: 'Requested'
        },
        requestedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

export const Item = mongoose.model('Item', itemSchema);