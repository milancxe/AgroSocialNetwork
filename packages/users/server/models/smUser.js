'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var UserModel= new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        trim: true
    },
    roles: {
        type: Array,
        default: ['authenticated']
    },
    provider: {
        type: String,
        default: 'local'
    },
    votedComments: [{
        comment: {
            type: Schema.ObjectId,
            ref: 'CommentModel',
        },
        val: {
            type:Number,
            default:0
        }

    }],
    votedReplyComments: [{
        replyComment: {
            type: Schema.ObjectId,
            ref: 'CommentModel.replies',
        },
        val: {
            type:Number,
            default:0
        }

    }],
    facebook: {},
    twitter: {},
    github: {},
    google: {},
    linkedin: {}
});

UserModel.virtual('password').set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.hashPassword(password);
}).get(function () {
    return this._password;
});

UserModel.methods = {

    hasRole: function (role) {
        var roles = this.roles;
        return roles.indexOf('admin') !== -1 || roles.indexOf(role) !== -1;
    },

    isAdmin: function () {
        return this.roles.indexOf('admin') !== -1;
    },

    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },

};

UserModel.statics.findUserDTO= function(id, cb){
    return this.findOne({
        _id: id
    }).populate('myChallenges','_id title').exec(cb);
};

mongoose.model('UserModel', UserModel);
