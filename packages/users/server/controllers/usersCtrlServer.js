'use strict';

var mongoose = require('mongoose');
var UserModel = mongoose.model('UserModel');
var UserCredentialModel = mongoose.model('UserCredentialModel');
var utils = require('../../../../utils/utils.js');

exports.user= function(req, res, next,id){

    UserModel.findOne({ _id: id}, function (err, user){
        req.user=user;
        next();
    });

};

exports.createUser = function (req, res, next) {

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


exports.logoutUser = function (req, res) {
     var cookies = [];
     if(req.headers.cookie!==null){
        req.headers.cookie.split(';').forEach(function( cookie ) {
            var parts = cookie.split('=');
            cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
        });

        if(cookies.remember_me) {
            //delete me from Token db before you delete my cookie
            utils.deleteMeFromToken(req.user, function(err,ok){
                if(err){
                    console.log(err);
                }
                res.clearCookie('remember_me');
            });
        }
    }
    req.logout();
    res.send(200);
    //res.redirect('/');
};

exports.editProfile=function(req,res){

    console.log('treba da promenim informacije o useru:');
    console.log(req.body);

    UserModel.findOne({_id:req.body._id}).exec(function(error,user){
        console.log('nasao sam ga:');
        console.log(user);
        user.lastName=req.body.lastName;
        user.username=req.body.username;
        user.firstName=req.body.firstName;

        user.save(function(err){
            if(err) res.send(400);
            res.send(200,user);
        });
    });
};

exports.changePassword=function(req,res){

    console.log('treba da promenim sifru');

    var password=req.body.password;

    if(password.newPassword===password.newPasswordRepeat){

        UserCredentialModel.findOne({user:req.user}).populate('user').exec(function(err,user){

            //var userCredential = new UserCredentialModel();

            console.log('autentificiram:');
            console.log(password.oldPassword);
            console.log(user);
            if(user.authenticate(password.oldPassword)){
                user.salt=user.makeSalt();
                user.hashed_password=user.hashPassword(password.newPassword);
                UserCredentialModel.update({_id:user._id},{ $set: { salt: user.salt,hashed_password:user.hashed_password }}, function(err, savedUser){
                    console.log(savedUser);
                });
                
            }else{
                console.log('ne valja mu sigra');
            }

        });
    }

};