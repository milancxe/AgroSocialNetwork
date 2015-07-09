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
    profilePicture: {
        type: String
    }

});

mongoose.model('PostModel', PostModel);