'use strict';


var mongoose = require('mongoose');
var PostModel = mongoose.model('PostModel');
var PostVoteModel = mongoose.model('PostVoteModel');
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
		//var votedIds={};
		var counter=0;

		var markVote=function(err,markedOne){
			counter=counter+1;
			console.log('iz markiranja:');
			if(markedOne){
				var ids=posts.map(function(it) { return it._id; });
				//trcim i trazim da li postoji lajkovan ako postoji postavim mu status
	    		for(var ind=0;ind<ids.length;ind=ind+1){
	    			if(String(markedOne.post)===String(ids[ind])){
	    				posts[ind].updownStatus=markedOne.voteValue;
    					break;
	    			}
	    		}
			}else{
				counter=counter+1;
			}
			if(posts.length===counter){
				console.log('saljeM:');
				console.log(posts);
				next(posts);
			}
		};
		for(var i=0; i<posts.length;i=i+1){
			PostVoteModel.findOne({author:userId,post:posts[i]},markVote);
		}


	}else{
		next(posts);
	}
};

