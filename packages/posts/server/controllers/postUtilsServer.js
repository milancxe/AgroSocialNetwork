'use strict';


var mongoose = require('mongoose');
var PostModel = mongoose.model('PostModel');
//var CommentModel = mongoose.model('CommentModel');


	

var postUtils= require('./postUtilsServer.js');

exports.findAllPostsByCreation=function( userId,lastId,next){

	var findCriteria=lastId?{_id : { '$lt' : lastId } }:{};

	PostModel.find(findCriteria).lean().populate({path:'author',model:'UserModel'})
		.limit(global.config.paginationSize.posts).sort('-created').exec(function(err,posts){

			postUtils.checkUserVotedPost(userId,posts,function (checkedPosts){
				next(checkedPosts);
			});
	});
	


};

exports.checkUserVotedPost = function( userId,posts,next){


	if(userId && posts) {
		for(var i=0; i<posts.length;i=i+1){
			for(var j=0; j<posts[i].scoreUp.length;j=j+1){
				if(String(userId)===String(posts[i].scoreUp[j])){
					//posts[i].toObject().upDownStatus = 1;
					//posts[i].toObject();
					posts[i].upDownStatus = 1;
					console.log('Record',posts[i]);
				}
			}
			for(var j=0; j<posts[i].scoreDown.length;j=j+1){
				if(String(userId)===String(posts[i].scoreDown[j])){
					posts[i].upDownStatus = 2;
				}
			}
		}
		next(posts);
	}else{
		next(posts);
	}
};
