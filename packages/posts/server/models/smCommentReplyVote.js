'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentReplyVoteModel= new Schema({
    
    commentReply:{
        type: Schema.ObjectId,
        ref: 'CommentModel.replies'
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

mongoose.model('CommentReplyVoteModel', CommentReplyVoteModel);