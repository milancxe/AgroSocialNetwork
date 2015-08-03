'use strict';


var mongoose = require('mongoose');
//var PostModel = mongoose.model('PostModel');
var CommentModel = mongoose.model('CommentModel');
var CommentVoteModel = mongoose.model('CommentVoteModel');
var CommentReplyVoteModel=mongoose.model('CommentReplyVoteModel');

exports.comment = function (req, res, next,id) {
	CommentModel.findOne({ _id: id}, function (err, comment){
  		req.comment=comment;
  		next();
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
		res.json(req.comment.replies);
	});
};

exports.voteOnComment = function(req,res,next){

	console.log('logujem usera i komentar');
	console.log(req.user);
	console.log(req.comment);

	CommentVoteModel.findOne({author:req.user,comment:req.comment}).exec(function(err, votedComment){

		if(err) res.send(500);
		console.log('objekat je:');
		console.log(votedComment);
		if(votedComment){

			if(votedComment.voteValue===req.body.value){
				console.log('votevalue je ista');
				votedComment.remove();
				if(req.body.value===1){
					req.comment.scoreUp=req.comment.scoreUp-1;
					console.log('uklonio sam ga i smanjio skor za scoreUp');
				}else{
					req.comment.scoreDown=req.comment.scoreDown-1;
					console.log('uklonio sam ga i smanjio skor za scoreDown');
				}
			}else{
				console.log('votevalue je razlicita');
				votedComment.voteValue=req.body.value;
				votedComment.save();
				if(req.body.value===1){
					req.comment.scoreDown=req.comment.scoreDown-1;
					req.comment.scoreUp=req.comment.scoreUp+1;
				}else{
					req.comment.scoreUp=req.comment.scoreUp-1;
					req.comment.scoreDown=req.comment.scoreDown+1;
				}
			}
			var response={};

			req.comment.save();
			response.scoreUp=req.comment.scoreUp;
			response.scoreDown=req.comment.scoreDown;
			res.send(200,response);

		}else{
			var newCommentVote = new CommentVoteModel();
			newCommentVote.voteValue=req.body.value;
			newCommentVote.author=req.user;
			newCommentVote.comment=req.comment;
			newCommentVote.save(function(err,newCommentVote){
				if(req.body.value===1){
					req.comment.scoreUp=req.comment.scoreUp+1;
				}else{
					req.comment.scoreDown=req.comment.scoreDown+1;
				}
				req.comment.save();
				var response={};

				response.scoreUp=req.comment.scoreUp;
				response.scoreDown=req.comment.scoreDown;
				res.send(200,response);

			});

		}


	});



};

exports.voteOnReplyComment = function(req,res,next){

	var reply={};
	var replyIndex=-1;

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
				if(req.body.voteType===1){
					req.comment.replies[replyIndex].scoreUp=req.comment.replies[replyIndex].scoreUp-1;
				}else{
					req.comment.replies[replyIndex].scoreDown=req.comment.replies[replyIndex].scoreDown-1;
				}
			}else{

				votedCommentReply.voteValue=req.body.value;
				votedCommentReply.save();
				if(req.body.value===1){
					req.comment.replies[replyIndex].scoreDown=req.comment.replies[replyIndex].scoreDown-1;
					req.comment.replies[replyIndex].scoreUp=req.comment.replies[replyIndex].scoreUp+1;
				}else{
					req.comment.replies[replyIndex].scoreUp=req.comment.replies[replyIndex].scoreUp-1;
					req.comment.replies[replyIndex].scoreDown=req.comment.replies[replyIndex].scoreDown+1;
				}
			}
			var response={};

			req.comment.save();
			response.scoreUp=req.comment.replies[replyIndex].scoreUp;
			response.scoreDown=req.comment.replies[replyIndex].scoreDown;
			res.send(200,response);

		}else{
			var newCommentVote = new CommentReplyVoteModel();
			newCommentVote.voteValue=req.body.value;
			newCommentVote.author=req.user;
			newCommentVote.commentReply=req.comment.replies[replyIndex];
			newCommentVote.save(function(err,newCommentVote){
				if(req.body.value===1){
					req.comment.replies[replyIndex].scoreUp=req.comment.replies[replyIndex].scoreUp+1;
				}else{
					req.comment.replies[replyIndex].scoreDown=req.comment.replies[replyIndex].scoreDown+1;
				}
				req.comment.save();
				var response={};

				response.scoreUp=req.comment.replies[replyIndex].scoreUp;
				response.scoreDown=req.comment.replies[replyIndex].scoreDown;
				res.send(200,response);

			});

		}


	});

	/*console.log('treba da glasam na reply komentar:');
	var reply={};
	var replyIndex=-1;
	console.log('user je:');
	console.log(req.user);
	for(var i=0; i<req.comment.replies.length;i=i+1){

		if(req.comment.replies[i]._id.equals(req.body.replyId)){
			console.log('nasao sam reply');
			reply=req.comment.replies[i];
			replyIndex=i;
		}
	}
	var voted=false;
	var votedValue=0;
	var votedIndex=0;
	//first to see if I already voted on this post!

	for(var i=0;i<req.user.votedReplyComments.length;i=i+1){
		console.log('u foru gledam dal sam glasao');
		if (req.user.votedReplyComments[i].replyComment.equals(reply._id)){
			voted=true;
			votedValue=req.user.votedReplyComments[i].val;
			votedIndex=i;
			console.log('glasao sam');
			break;
		}

	}

	if(voted===false){	
		var voting={};


		voting.replyComment=reply._id;
		voting.val = req.body.value;
		console.log(voting);

		req.user.votedReplyComments.push(voting);
		req.user.save(function(err,replyComment){
			if(err) res.send(500,{error:'error occured cannot vote on comment'});
			if(req.body.value===1){
				req.comment.replies[replyIndex].scoreUp=req.comment.replies[replyIndex].scoreUp+1;
				req.comment.save(function(err,comment){
						if (err) res.json(500,{error:'there was an error with voting'});
						res.send(200,comment.replies[replyIndex]);
					});
			}else{
				req.comment.replies[replyIndex].scoreDown=req.comment.replies[replyIndex].scoreDown+1;
				req.comment.save(function(err,comment){
						if (err) res.json(500,{error:'there was an error with voting'});
						res.send(200,comment.replies[replyIndex]);
					});
			}
		});

	}else{
		//if he already upvoated a comment
		if(votedValue===1){

			//if i pressed upvote again
			if(req.body.value===1){
				console.log('vrednost je 1 treba da stavim na 0 jer je opet stisnuo 1');
				req.user.votedReplyComments.splice(votedIndex,1);
				req.user.save(function(err,user){
					if(err) res.send(500,{error:'there was an error with voting'});
					req.comment.replies[replyIndex].scoreUp=req.comment.replies[replyIndex].scoreUp-1;
					req.comment.save(function(err,comment){
						if (err) res.json(500,{error:'there was an error with voting'});
						res.send(200,comment.replies[replyIndex]);
					});
				});
				
			}else{


				req.user.votedReplyComments.splice(votedIndex,1);
				var voting={};
				voting.replyComment=reply._id;
				voting.val = req.body.value;

				req.user.votedReplyComments.push(voting);
				req.user.save(function(err,user){
					if(err) res.json(500,{error:'there was an error with voting'});
					req.comment.replies[replyIndex].scoreUp=req.comment.replies[replyIndex].scoreUp-1;
					req.comment.replies[replyIndex].scoreDown=req.comment.replies[replyIndex].scoreDown+1;
					req.comment.save(function(err,comment){
						if (err) res.json(500,{error:'there was an error with voting'});
						res.send(200,comment.replies[replyIndex]);
					});
				});
			}
			//do ovde gotovo
		}else if(votedValue===2){
			console.log('glasao sam sa 2');
			console.log('i sad hocu sa :');
			console.log(req.body.value);
			if(req.body.value===2){

				req.user.votedReplyComments.splice(votedIndex,1);
				req.user.save(function(err,user){
					if(err) res.json(500,{error:'there was an error with voting'});
					req.comment.replies[replyIndex].scoreDown=req.comment.replies[replyIndex].scoreDown-1;
					req.comment.save(function(err,comment){
						if (err) res.json(500,{error:'there was an error with voting'});
						res.send(200,comment.replies[replyIndex]);
					});
				});
			}else{

				req.user.votedReplyComments.splice(votedIndex,1);

				var voting={};
				voting.replyComment=reply._id;
				voting.val = req.body.value;

				req.user.votedReplyComments.push(voting);
				req.user.save(function(err,user){
					if(err) res.json(500,{error:'there was an error with voting'});
					req.comment.replies[replyIndex].scoreDown=req.comment.replies[replyIndex].scoreDown-1;
					req.comment.replies[replyIndex].scoreUp=req.comment.replies[replyIndex].scoreUp+1;
					req.comment.save(function(err,comment){
						if (err) res.json(500,{error:'there was an error with voting'});
						res.send(200,comment.replies[replyIndex]);
					});
				});
			}
		}else{
			console.log('something strange happend');
			res.send(500,{error:'there was an error with voting on comments try again'});
		}
	}
*/

};