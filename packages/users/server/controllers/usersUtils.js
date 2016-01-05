'use strict';

var mongoose = require('mongoose');
var PostVoteModel = mongoose.model('PostVoteModel');
var CommentModel = mongoose.model('CommentModel');
var PostModel=mongoose.model('PostModel');

exports.findPostsVotedByUser = function( userId,lastId,next){


	var index=0;

	var endVal=10;
	PostVoteModel
		.find({author:userId})
		.distinct('post',function(error,ids) {

		   	for(var i=0;i<ids.length;i=i+1){
		   		if(String(ids[i])===String(lastId)){
		   			index=i+1;
		   		}
		   	}
		   	if(lastId!==0){
		   		endVal = ids.length;
		   	}
		   	var pom =ids.slice(index,endVal);
		   		
		   	PostModel.find({'_id':{$in : pom}}).populate({path:'author',model:'UserModel'}).limit(global.config.paginationSize.posts).sort('-created').exec(function(err,posts){ 

		     	next(posts);
		   	});
	});

};

exports.findPostsCommentedByUser = function( userId,lastId,next){

	/*var findCriteria=lastId?{author:userId, _id : { '$lt' : lastId } }:{};*/
	var index=0;

	var endVal=10;
	CommentModel
		.find({author:userId})

		.distinct('post',function(error,ids) {
			for(var i=0;i<ids.length;i=i+1){
		   		if(String(ids[i])===String(lastId)){
		   			index=i+1;
		   		}
		   	}
		   	if(lastId!==0){
		   		endVal = ids.length;
		   	}
		   	var pom =ids.slice(index,endVal);

		   	PostModel.find({'_id':{$in : pom}}).populate({path:'author',model:'UserModel'}).limit(global.config.paginationSize.posts).sort('-created').exec(function(err,posts){ 
		    	next(posts);
		   	});
	});


};