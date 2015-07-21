'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentModel= new Schema({
    author:{
        type: Schema.ObjectId,
        ref: 'UserModel'
    },
    post:{
        type: Schema.ObjectId,
        ref: 'PostModel'
    },
    text: {
        type: String,
        trim: true
    },
    scoreUp:{
        type: Number,
        default:0
    },
    scoreDown:{
        type: Number,
        default:0
    },
    replies:[{
        type: Schema.ObjectId,
        ref: 'PostModel'
    }]


});

mongoose.model('CommentModel', CommentModel);