'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostModel= new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    author:{
        type: Schema.ObjectId,
        ref: 'UserModel'
    },
    postImage: [{
        type: String,
        trim: true
    }],
    created: {
        type: Date,
        default: Date.now
    },
    scoreUp:[{
        type: Schema.ObjectId,
        ref: 'UserModel'
    }],
    scoreDown:[{
        type: Schema.ObjectId,
        ref: 'UserModel'
    }]

});

mongoose.model('PostModel', PostModel);