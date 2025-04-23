import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: { 
        type: String, 
        required: true,
    },
    profilePic: {
        type: String,
        default: 'default.jpg'
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    requests: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            quantity: { type: Number, default: 1 },
            status: {
                type: String,
                enum: ['Requested', 'Accepted', 'Completed', 'Declined'],
                default: 'Requested'
            },
            requestedAt: { type: Date, default: Date.now }
        }],
},{ timestamps: true });


export const User = mongoose.model('User', userSchema);