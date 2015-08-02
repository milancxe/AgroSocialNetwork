'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentVoteModel= new Schema({
    comment:{
        type: Schema.ObjectId,
        ref: 'Comment'
    },
    created: {
        type: Date,
        default: Date.now
    },
    voteValue:{
        type:Number,
        required: true,
        trim: true
    },
    author:{
        type: Schema.ObjectId,
        ref: 'UserModel'
    }

});

mongoose.model('CommentVoteModel', CommentVoteModel);