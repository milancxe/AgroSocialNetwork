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
    scoreUp:{
        type: Number,
        default:0,
        trim: true
    },
    scoreDown:{
        type: Number,
        default:0,
        trim: true
    },
    contentVideo: [{
        typeOfVideo:{
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        _id: false
    }]

});

mongoose.model('PostModel', PostModel);