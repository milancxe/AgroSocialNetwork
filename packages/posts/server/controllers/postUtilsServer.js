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


exports.giveMeBestFive=function( userId,lastId,next){

	var findCriteria={$where:'this.scoreUp>this.scoreDown'};
	console.log(findCriteria);
	PostModel.find(findCriteria).populate({path:'author',model:'UserModel'}).limit(5).exec(function(err,foundPosts){
		console.log(foundPosts);
		next(foundPosts);
	});
	


};
	

exports.findPost = function( searchText,next){



	var re = new RegExp('.*'+searchText+'.*','i');

	console.log(re);
	PostModel.find({title:re}).populate({path:'author',model:'UserModel'}).exec(function(err,foundPosts){
		next(foundPosts);
	});

};

exports.checkUserVotedPost = function( userId,posts,next){


	if(userId && posts) {
		//var votedIds={};
		var counter=0;

		var markVote=function(err,markedOne){
			counter=counter+1;
			if(markedOne){
				var ids=posts.map(function(it) { return it._id; });
				//trcim i trazim da li postoji lajkovan ako postoji postavim mu status
	    		for(var ind=0;ind<ids.length;ind=ind+1){
	    			if(String(markedOne.post)===String(ids[ind])){
	    				posts[ind].updownStatus=markedOne.voteValue;
    					break;
	    			}
	    		}

			}
			if(posts.length===counter){
				next(posts);
			}
			
		};
		for(var i=0; i<posts.length;i=i+1){
			if(posts[i].scoreUp!==0 ||posts[i].scoreDown!==0){
				PostVoteModel.findOne({author:userId,post:posts[i]},markVote);
			}else{
				counter=counter+1;
				if(counter===posts.length){
					next(posts);
				}
			}
		}


	}else{
		next(posts);
	}
};

