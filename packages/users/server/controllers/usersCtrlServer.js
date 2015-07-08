'use strict';

var mongoose = require('mongoose');
var UserModel = mongoose.model('UserModel');
var UserCredentialModel = mongoose.model('UserCredentialModel');

exports.createUser = function (req, res, next) {

	console.log('spicili ste serverski kontroler');

    var user = new UserModel();
    user.provider = 'local';
    user.roles = ['authenticated'];
    user.username=req.body.username;
    user.firstName = req.body.firstName;
    user.lastName=req.body.lastName;

    var userCredential = new UserCredentialModel();

	userCredential.email=req.body.email;
	userCredential.salt=userCredential.makeSalt();
	userCredential.hashed_password=userCredential.hashPassword(req.body.password);

    user.save(function (err) {
        if (err) {
            return res.status(400).send(err);
        }

        userCredential.user=user;
        userCredential.save();

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json(user);
        });
        
    });
};