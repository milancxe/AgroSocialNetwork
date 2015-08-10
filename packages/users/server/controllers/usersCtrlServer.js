'use strict';

var mongoose = require('mongoose');
var UserModel = mongoose.model('UserModel');
var PostModel = mongoose.model('PostModel');
//var CommentModel = mongoose.model('CommentModel');
var UserCredentialModel = mongoose.model('UserCredentialModel');
var utils = require('../../../../utils/utils.js');
var usersUtils = require('./usersUtils.js');

exports.user= function(req, res, next,id){

    UserModel.findOne({ _id: id}, function (err, user){
        req.user=user;
        next();
    });

};

exports.getUser= function(req, res, next){

    UserModel.findOne({ _id: req.body.userId}, function (err, user){
        if (err) res.send(500,{error:'cannot find use'});
        res.send(200,user);
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
    var password=req.body.password;
    
    if(password.newPassword===password.newPasswordRepeat){
        UserCredentialModel.findOne({user:req.user}).populate('user').exec(function(err,user){

            if(user.authenticate(password.oldPassword)){
                user.salt=user.makeSalt();
                user.hashed_password=user.hashPassword(password.newPassword);
                UserCredentialModel.update({_id:user._id},{ $set: { salt: user.salt,hashed_password:user.hashed_password }}, function(err, savedUser){
                    if(err) res.send(500);
                    res.send(200);
                });
                
            }else{
                res.send(500);
            }

        });
    }

};

exports.getPostsCreatedByUser=function(req,res,next){
    console.log('trazim kreirane od usera:');
    console.log(req.user);

    var lastId= req.body.lastId ? req.body.lastId : null ;
    var userId = req.user ? req.user._id :null;

    var findCriteria=lastId?{author:userId,_id : { '$lt' : lastId } }:{author:userId};
    PostModel.find(findCriteria).lean().limit(global.config.paginationSize.posts).sort('-created').exec(function(err,posts){
        if(err) res.send(500);
        res.send(200,posts);
    });
};

exports.getPostsVotedByUser=function(req,res,next){

    var lastId= req.body.lastId ? req.body.lastId : null ;
    var userId = req.user ? req.user._id :null;
    usersUtils.findPostsVotedByUser(userId, lastId ,function(posts){

        res.send(200,posts);

    });

};

exports.getPostsCommentedByUser=function(req,res,next){

    var lastId= req.body.lastId ? req.body.lastId : null ;
    var userId = req.user ? req.user._id :null;
    usersUtils.findPostsCommentedByUser(userId, lastId ,function(posts){

        res.send(200,posts);

    });
};
