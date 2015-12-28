'use strict';


var mongoose = require('mongoose');
//var PostModel = mongoose.model('PostModel');
var CommentModel = mongoose.model('CommentModel');
var CommentVoteModel = mongoose.model('CommentVoteModel');
var CommentReplyVoteModel=mongoose.model('CommentReplyVoteModel');

var commentUtils= require('./commentUtilsServer.js');

exports.comment = function (req, res, next,id) {
	CommentModel.findOne({ _id: id}, function (err, comment){
  		req.comment=comment;
  		next();
	});
};

exports.commentOnPost = function(req,res,next){



	var comment = new CommentModel();
	comment.text=req.body.commentText;
	comment.author=req.user;
	comment.post=req.post;
	comment.save(function(err,comment){
		if (err) res.json(500,{error:'Error occured not able to save comment try again'});
		res.json(200,comment);
	});
};

exports.getCommentsOnPost=function(req,res,next){

	var lastId= req.body.lastId ? req.body.lastId : null ;
	var userId = req.user ? req.user._id :null;

	commentUtils.findCommentsByCreation(req.post._id,userId, lastId ,function(comments){

		res.send(200,comments);

	});

};


exports.addCommentReply = function(req,res,next){

	console.log(req.body.commentReplyText);
	var replyComment={};
	replyComment.author=req.user;
	replyComment.text=req.body.commentReplyText;

	req.comment.replies.push(replyComment);

	req.comment.save(function(err,comment){
		if(err) res.json(500,{error:'cannot add reply on comment'});
			CommentModel.populate(comment, {path:'replies.author',model:'UserModel'},function(err, comment){
				res.json(comment.replies);
			});
	});
};

exports.voteOnComment = function(req,res,next){

	CommentVoteModel.findOne({author:req.user,comment:req.comment}).exec(function(err, votedComment){

		if(err) res.send(500);
		var updownStatus = {};

		if(votedComment){

			if(votedComment.voteValue===req.body.value){

				votedComment.remove();
				if(req.body.value===1){
					req.comment.scoreUp=req.comment.scoreUp-1;
					updownStatus=0;
				}else{
					req.comment.scoreDown=req.comment.scoreDown-1;
					updownStatus=0;
				}
			}else{

				votedComment.voteValue=req.body.value;
				votedComment.save();
				if(req.body.value===1){
					req.comment.scoreDown=req.comment.scoreDown-1;
					req.comment.scoreUp=req.comment.scoreUp+1;
					updownStatus=1;
				}else{
					req.comment.scoreUp=req.comment.scoreUp-1;
					req.comment.scoreDown=req.comment.scoreDown+1;
					updownStatus=2;
				}
			}
			var response={};

			req.comment.save();
			response.scoreUp=req.comment.scoreUp;
			response.scoreDown=req.comment.scoreDown;
			response.updownStatus=updownStatus;
			res.send(200,response);

		}else{
			var newCommentVote = new CommentVoteModel();
			newCommentVote.voteValue=req.body.value;
			newCommentVote.author=req.user;
			newCommentVote.comment=req.comment;
			newCommentVote.save(function(err,newCommentVote){
				if(req.body.value===1){
					req.comment.scoreUp=req.comment.scoreUp+1;
					updownStatus=1;
				}else{
					req.comment.scoreDown=req.comment.scoreDown+1;
					updownStatus=2;
				}
				req.comment.save();
				var response={};

				response.scoreUp=req.comment.scoreUp;
				response.scoreDown=req.comment.scoreDown;
				response.updownStatus=updownStatus;
				res.send(200,response);

			});

		}


	});



};

exports.voteOnReplyComment = function(req,res,next){

	var reply={};
	var replyIndex=-1;
	var updownStatus = {};

	for(var i=0; i<req.comment.replies.length;i=i+1){

		if(req.comment.replies[i]._id.equals(req.body.replyId)){
			replyIndex=i;
			reply=req.comment.replies[i];
		}
	}
	CommentReplyVoteModel.findOne({author:req.user,commentReply:req.comment.replies[replyIndex]}).exec(function(err, votedCommentReply){

		if(err) res.send(500);
		if(votedCommentReply){

			if(votedCommentReply.voteValue===req.body.value){
				votedCommentReply.remove();
				if(req.body.value===1){
					req.comment.replies[replyIndex].scoreUp=req.comment.replies[replyIndex].scoreUp-1;

				}else{
					req.comment.replies[replyIndex].scoreDown=req.comment.replies[replyIndex].scoreDown-1;
				}
				updownStatus = 0;
			}else{

				votedCommentReply.voteValue=req.body.value;
				votedCommentReply.save();
				if(req.body.value===1){
					req.comment.replies[replyIndex].scoreDown=req.comment.replies[replyIndex].scoreDown-1;
					req.comment.replies[replyIndex].scoreUp=req.comment.replies[replyIndex].scoreUp+1;
					updownStatus = 1;
				}else{
					req.comment.replies[replyIndex].scoreUp=req.comment.replies[replyIndex].scoreUp-1;
					req.comment.replies[replyIndex].scoreDown=req.comment.replies[replyIndex].scoreDown+1;
					updownStatus = 2;
				}
			}
			var response={};

			req.comment.save();
			response.scoreUp=req.comment.replies[replyIndex].scoreUp;
			response.scoreDown=req.comment.replies[replyIndex].scoreDown;
			response.updownStatus = updownStatus ;
			res.send(200,response);

		}else{
			var newCommentVote = new CommentReplyVoteModel();
			newCommentVote.voteValue=req.body.value;
			newCommentVote.author=req.user;
			newCommentVote.commentReply=req.comment.replies[replyIndex];
			newCommentVote.save(function(err,newCommentVote){
				if(req.body.value===1){
					req.comment.replies[replyIndex].scoreUp=req.comment.replies[replyIndex].scoreUp+1;
					updownStatus = 1;
				}else{
					req.comment.replies[replyIndex].scoreDown=req.comment.replies[replyIndex].scoreDown+1;
					updownStatus = 2;
				}
				req.comment.save();
				var response={};

				response.scoreUp=req.comment.replies[replyIndex].scoreUp;
				response.scoreDown=req.comment.replies[replyIndex].scoreDown;
				response.updownStatus = updownStatus ;
				res.send(200,response);

			});

		}


	});

};