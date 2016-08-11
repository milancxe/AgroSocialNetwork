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
    created: {
        type: Date,
        default: Date.now
    },
    replies:[{
        author:{
            type: Schema.ObjectId,
            ref: 'UserModel'
        },
        text:{
            type: String,
            trim: true
        },
        scoreUp:{
            type:Number,
            default:0
        },
        scoreDown:{
            type: Number,
            default:0
        },
        created: {
            type: Date,
            default: Date.now
        }

    }]
});

mongoose.model('CommentModel', CommentModel);