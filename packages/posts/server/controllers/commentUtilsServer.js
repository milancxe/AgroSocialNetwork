'use strict';

var mongoose = require('mongoose');
//var PostModel = mongoose.model('PostModel');
var CommentModel = mongoose.model('CommentModel');
var CommentReplyVoteModel = mongoose.model('CommentReplyVoteModel');
var CommentVoteModel= mongoose.model('CommentVoteModel');

var commentUtils= require('./commentUtilsServer.js');


exports.findCommentsByCreation=function( userId,lastId,next){

	var findCriteria=lastId?{_id : { '$lt' : lastId } }:{};
	console.log('pogodjena druga funkcija');

	CommentModel.find(findCriteria).lean().populate({path:'author',model:'UserModel'})
		.limit(global.config.comments).sort('-created').exec(function(err,comments){

			console.log('prosao find');
			commentUtils.checkUserVotedComments(userId,comments,function (checkedComments){
				next(checkedComments);
			});
	});

};

exports.checkUserVotedComments = function( userId,comments,next){



	var logThem=function(marked){
		if(marked) console.log(marked);
		/*console.log('logujem replajeve:');
		console.log(replies);*/
	};
	for(var i=0;i<comments.length;i=i+1){

		if(comments[i].replies.length>0){
			commentUtils.checkUserVotedCommentReplies(userId,comments[i].replies,logThem);
		}
	}
	if(userId && comments) {
		//var votedIds={};
		var counter=0;

		var markVote=function(err,markedOne){
			counter=counter+1;
			console.log('iz markiranja:');
			if(markedOne){
				var ids=comments.map(function(it) { return it._id; });
				//trcim i trazim da li postoji lajkovan ako postoji postavim mu status
	    		for(var ind=0;ind<ids.length;ind=ind+1){
	    			if(String(markedOne.comment)===String(ids[ind])){
	    				comments[ind].updownStatus=markedOne.voteValue;
    					break;
	    			}
	    		}

			}
			if(comments.length===counter){
				console.log('saljeM:');
				console.log(comments);
				next(comments);
			}
			
		};
		for(var i=0; i<comments.length;i=i+1){
			if(comments[i].scoreUp!==0 ||comments[i].scoreDown!==0){
				CommentVoteModel.findOne({author:userId,comment:comments[i]},markVote);
			}else{
				counter=counter+1;
				if(counter===comments.length){
					next(comments);
				}
			}
		}


	}else{
		next(comments);
	}
};

exports.checkUserVotedCommentReplies=function(userId,replies,next){

		if(userId && replies) {
		//var votedIds={};
		var counter=0;

		var markVote=function(err,markedOne){
			counter=counter+1;

			if(markedOne){
				var ids=replies.map(function(it) { return it._id; });
				console.log('iz markiranja logujem markiranog:');
				console.log(markedOne);
				console.log('logujem mapu');
				console.log(ids);
				//trcim i trazim da li postoji lajkovan ako postoji postavim mu status
	    		for(var ind=0;ind<ids.length;ind=ind+1){
	    			if(String(markedOne.commentReply)===String(ids[ind])){
	    				replies[ind].updownStatus=markedOne.voteValue;
	    				console.log('postavio sam mu status');
    					break;
	    			}
	    		}

			}
			if(replies.length===counter){
				/*console.log('saljeM:');
				console.log(replies);*/
				next(replies);
			}
			
		};
		for(var i=0; i<replies.length;i=i+1){
			if(replies[i].scoreUp!==0 ||replies[i].scoreDown!==0){
				CommentReplyVoteModel.findOne({author:userId,commentReply:replies[i]},markVote);
			}else{
				counter=counter+1;
				if(counter===replies.length){
					next(replies);
				}
			}
		}


	}else{
		next(replies);
	}
};