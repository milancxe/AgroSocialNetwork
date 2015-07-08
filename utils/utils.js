
'use strict';

var mongoose = require('mongoose');
var utils = require('./utils.js');
var TokenModel = mongoose.model('TokenModel');

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//method used for creating token for remember me function
exports.randomString = function(len) {
	var buf = [] , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' , charlen = chars.length;

	for (var i = 0; i < len; i+=1) {
		buf.push(chars[getRandomInt(0, charlen - 1)]);
	}

	return buf.join('');
};

exports.deleteMeFromToken= function(user, next){
	TokenModel.findOne({uid:user._id}).exec(function(err,tok){
		if(err){
			console.log(err);
			return next(err);
		}
		if(tok){
			tok.remove();
		}
	});
	return next();
};


exports.consumeRememberMeToken= function(token, fn) {
	console.log(token);
	TokenModel.findOne({random:token}).exec(function (err, tok) {
		if (err ) {
			console.log('could not find token in database');
			console.log(err);
			return null;
		}
        // invalidate the single-use token
        var uid=null;
        if(tok){
        	uid = tok.uid;
        	tok.remove();
        }
        return fn(null, uid);
    });
};

exports.saveRememberMeToken= function (token, uid, fn) {
  //  tokens[token] = uid;
  var tok = new TokenModel({uid:uid, random:token});
  tok.save(function(err, tok) {
  	if (err) return console.error(err);
  });
  return fn();
};

exports.issueToken=function(user, done) {
	var token = utils.randomString(64);
	utils.saveRememberMeToken(token, user._id, function(err) {
		if (err) { return done(err); }
		return done(null, token);
	});
};