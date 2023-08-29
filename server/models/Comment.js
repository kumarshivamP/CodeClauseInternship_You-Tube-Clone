const mongoose = require("mongoose");

const CommentScema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    videoId:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    
}, {timestamps: true} )

const Comment = mongoose.model('comment', CommentScema)
module.exports =  Comment;