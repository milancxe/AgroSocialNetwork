'use strict';


var mongoose = require('mongoose');
//var PostModel = mongoose.model('PostModel');
var CommentModel = mongoose.model('CommentModel');

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

	console.log('spicio si glasanje na komentar');

	var voted=false;
	var votedValue=0;
	var votedIndex=0;
	//first to see if I already voted on this post!
	for(var i=0;i<req.user.votedComments.length;i=i+1){
		if (req.user.votedComments[i].comment.equals(req.comment._id)){
			voted=true;
			votedValue=req.user.votedComments[i].val;
			votedIndex=i;

			break;
		}

	}
	console.log('proverio sam ga');
	if(voted===false){	
		var voting={};
		voting.comment=req.comment._id;
		voting.val = req.body.value;
		console.log(voting);
		req.user.votedComments.push(voting);
		req.user.save(function(err,comment){
			if(err) res.json(500,{error:'error occured cannot vote on comment'});
			if(req.body.value===1){
				req.comment.scoreUp=req.comment.scoreUp+1;
				req.comment.save(function(err,comment){
						if (err) res.json(500,{error:'there was an error with voting'});
						res.json(200,comment);
					});
			}else{
				req.comment.scoreDown=req.comment.scoreDown+1;
				req.comment.save(function(err,comment){
						if (err) res.json(500,{error:'there was an error with voting'});
						res.json(200,comment);
					});
			}
			
		});

	}else{
		//if he already upvoated a comment
		if(votedValue===1){

			//if i pressed upvote again
			if(req.body.value===1){
				console.log('vrednost je 1 treba da stavim na 0 jer je opet stisnuo 1');
				req.user.votedComments.splice(votedIndex,1);
				req.user.save(function(err,user){
					if(err) res.json(500,{error:'there was an error with voting'});
					req.comment.scoreUp=req.comment.scoreUp-1;
					req.comment.save(function(err,comment){
						if (err) res.json(500,{error:'there was an error with voting'});
						res.json(200,comment);
					});
				});
			}else{


				req.user.votedComments.splice(votedIndex,1);
				var voting={};
				voting.comment=req.comment._id;
				voting.val = req.body.value;
				req.user.votedComments.push(voting);
				req.user.save(function(err,user){
					if(err) res.json(500,{error:'there was an error with voting'});
					req.comment.scoreUp=req.comment.scoreUp-1;
					req.comment.scoreDown=req.comment.scoreDown+1;
					req.comment.save(function(err,comment){
						if (err) res.json(500,{error:'there was an error with voting'});
						res.json(200,comment);
					});
				});
			}
		}else if(votedValue===2){
			if(req.body.value===2){

				req.user.votedComments.splice(votedIndex,1);
				req.user.save(function(err,user){
					if(err) res.json(500,{error:'there was an error with voting'});
					req.comment.scoreDown=req.comment.scoreDown-1;
					req.comment.save(function(err,comment){
						if (err) res.json(500,{error:'there was an error with voting'});
						res.json(200,comment);
					});
				});
			}else{
				req.user.votedComments.splice(votedIndex,1);
				var voting={};
				voting.comment=req.comment._id;
				voting.val = req.body.value;
				req.user.votedComments.push(voting);
				req.user.save(function(err,user){
					if(err) res.json(500,{error:'there was an error with voting'});
					req.comment.scoreDown=req.comment.scoreDown-1;
					req.comment.scoreUp=req.comment.scoreUp+1;
					req.comment.save(function(err,comment){
						if (err) res.json(500,{error:'there was an error with voting'});
						res.json(200,comment);
					});
				});
			}
		}else{
			console.log('something strange happend');
			res.send(500,{error:'there was an error with voting on comments try again'});
		}

	}

	/**/

};