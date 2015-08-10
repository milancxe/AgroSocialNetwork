'use strict';

var mongoose = require('mongoose');
var PostVoteModel = mongoose.model('PostVoteModel');
var CommentModel = mongoose.model('CommentModel');
var PostModel=mongoose.model('PostModel');

exports.findPostsVotedByUser = function( userId,lastId,next){

	var findCriteria=lastId?{author:userId, _id : { '$lt' : lastId } }:{};

	PostVoteModel.find(findCriteria).lean().populate({path:'author',model:'UserModel'})
		.limit(global.config.paginationSize.posts).sort('-created').exec(function(err,posts){


			next(posts);

	});

};

exports.findPostsCommentedByUser = function( userId,lastId,next){

	var findCriteria=lastId?{author:userId, _id : { '$lt' : lastId } }:{};

	CommentModel
		.find(findCriteria)

		.distinct('post',function(error,ids) {
		   PostModel.find({'_id':{$in : ids}}).limit(global.config.paginationSize.posts).sort('-created').exec(function(err,posts){ 
		     next(posts);
		   });
	});


};