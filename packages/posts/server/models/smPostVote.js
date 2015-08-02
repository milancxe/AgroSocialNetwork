'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostVoteModel= new Schema({
    post:{
        type: Schema.ObjectId,
        ref: 'PostModel'
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

mongoose.model('PostVoteModel', PostVoteModel);