const mongoose = require("mongoose");

const UserScema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
    },
    img:{
        type: String
    },
    subscribers:{
        type: Number,
        default: 0
    },
    subscribedUsers:{
        type: [String],
        default:[]
    },
    fromGoogle:{
        type: Boolean,
        default: false
    }
}, {timestamps: true} )

const User = mongoose.model('User', UserScema)
module.exports =  User;