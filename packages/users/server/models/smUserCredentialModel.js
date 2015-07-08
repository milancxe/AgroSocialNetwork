'use strict';

var mongoose = require('mongoose'),
	crypto = require('crypto'),
    Schema = mongoose.Schema;

var validatePassword = function (value) {
    return (this.provider && this.provider !== 'local') || (value && value.length);
};

var validateEmailExistence = function (value, callback) {
    var UserCredentialModel = mongoose.model('UserCredentialModel');
    UserCredentialModel.find({
        $and: [
            {email: value},
            {id: {$ne: this._id}}
        ]
    }, function (err, user) {
        callback(err || user.length === 0);
    });
};

var UserCredentialModel = new Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'UserModel'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        /*match: [new RegExp('^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'), 'Please enter a valid email'],*/
        validate: [validateEmailExistence, 'E-mail address is already in-use']
    },
    hashed_password: {
        type: String,
        validate: [validatePassword, 'Password cannot be blank']
    },
    salt:{
        type: String,
        required:true
    },
    resetPasswordToken:{
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
});

UserCredentialModel.methods = {
    authenticate: function (plainText) {
        return this.hashPassword(plainText) === this.hashed_password;
    },

    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },

    hashPassword: function (password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },

    checkRequest: function (req){
        req.assert('firstName', 'You must enter the first name').notEmpty();
        req.assert('lastName', 'You must enter the last name').notEmpty();
        req.assert('email', 'You must enter a valid email address').isEmail();
        req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
        req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
        return req.validationErrors();
    }

};

UserCredentialModel.pre('save', function (next) {
    if (this.password && !this.password.length)
        return next(new Error('Invalid password'));
    next();
});

mongoose.model('UserCredentialModel', UserCredentialModel);