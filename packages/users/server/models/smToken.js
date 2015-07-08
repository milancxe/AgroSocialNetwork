'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenModel= new Schema({
	uid: {
        type: Schema.ObjectId,
        ref: 'UserModel'
    },
    random: {
        type: String,
        required: true,
        trim: true
    }
});

mongoose.model('TokenModel', TokenModel);