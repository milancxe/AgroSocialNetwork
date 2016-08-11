'use strict';


var mongoose = require('mongoose');
var PostModel = mongoose.model('PostModel');
var PostVoteModel = mongoose.model('PostVoteModel');
var postUtils= require('./postUtilsServer.js');
var fs = require('fs');
var _ = require('lodash');
exports.post = function (req, res, next,id) {
	PostModel.findOne({ _id: id}, function (err, post){
  		req.post=post;
  		next();
	});
};

exports.getOnePost = function (req, res) {

	if(req.user){
		var posts=[];
		posts.push(req.post.toObject());
		postUtils.checkUserVotedPost(req.user._id,posts,function(checkedPostArray){

			res.send(checkedPostArray[0]);
		});
	}else{
		res.send(req.post);
	}
	
};

exports.getAllPosts=function(req,res){

	var lastId= req.body.lastId ? req.body.lastId : null ;
	var userId = req.user ? req.user._id :null;
	postUtils.findAllPostsByCreation(userId, lastId ,function(posts){

		res.send(200,posts);

	});

};

exports.giveMeBestFive=function(req,res){

	var lastId= req.body.lastId ? req.body.lastId : null ;
	var userId = req.user ? req.user._id :null;
	postUtils.giveMeBestFive(userId, lastId ,function(posts){

		res.send(200,posts);

	}); 

};

exports.createPost = function (req, res, next) {


	var newPost = new PostModel(req.body);
	console.log(req.body);
	newPost.title=req.body.title;
	newPost.description= req.body.description;
	newPost.author=req.user;

	newPost.save(function (err) {
        if (err) {
            return res.status(400).send(err);
        }
        return res.json(newPost);
       
        
    });

};

exports.update= function(req,res,next){



	var post=req.post;

	if(req.body.deleteImages){
		for(var k=0; k<req.body.deleteImages.length;k=k+1){

			//treba da protrcim kroz niz slika na postu nadjem tu i obrisem je i sacuvam post
			for(var i=0;i<post.postImage.length;i=i+1){
				if(post.postImage[i]===req.body.deleteImages[k]){
					for(var j=0;j<global.config.imageDimensions.length;j=j+1){
						post.postImage.splice(i,1);
		            	fs.unlink(global.config.filePathPostImage() +global.config.imageDimensions[j]+'/'+ req.body.deleteImages[k]);
		            	break;
		        	}
				}
			}

		}
	}

	post = _.extend(post, req.body);
	post.save(function(err,data){
		if(err) res.json(500,{error:'cannot edit this post '});
		res.json(200,data);
	});
	

};

exports.deletePost = function(req,res,next){


	var postToDelete=req.post;
	PostModel.findOne({_id:postToDelete._id}).exec(function(err,post){
		if (err) console.log('err was made');
		//delete image files
        for(var i = 0; i< post.postImage.length; i += 1) {

        	for(var j=0;j<global.config.imageDimensions.length;j=j+1){
            	fs.unlink(global.config.filePathPostImage() +'/'+global.config.imageDimensions[j]+'/'+ post.postImage[i]);
        	}
        }

		post.remove(function(err){
			if(err){
				return res.json(500,{error:'Error occured while post delete'});
			}
			return res.json(200);
		});
	});

};

exports.searchPosts = function(req,res,next){
	postUtils.findPost(req.body.searchText,function(foundPosts){
		res.json(foundPosts);
	});

};

exports.voteOnPost = function(req,res,next){
	//check to see If I already voted on post
	PostVoteModel.findOne({post:req.post,author:req.user}).exec(function(err, postVote){
		if (err) res.send(500);
		var updownStatus={};
		if (postVote){
			if(postVote.voteValue===req.body.voteType){
				postVote.remove();
				if(req.body.voteType===1){
					req.post.scoreUp=req.post.scoreUp-1;
				}else{
					req.post.scoreDown=req.post.scoreDown-1;
				}
				updownStatus=0;
			}else{
				postVote.voteValue=req.body.voteType;
				postVote.save();
				if(req.body.voteType===1){
					req.post.scoreDown=req.post.scoreDown-1;
					req.post.scoreUp=req.post.scoreUp+1;
					updownStatus=1;
				}else{
					req.post.scoreUp=req.post.scoreUp-1;
					req.post.scoreDown=req.post.scoreDown+1;
					updownStatus=2;
				}
			}
			var response={};

			req.post.save();
			response.scoreUp=req.post.scoreUp;
			response.scoreDown=req.post.scoreDown;
			response.updownStatus=updownStatus;
			res.send(200,response);

		}else{
			var newPostVote = new PostVoteModel();
			newPostVote.voteValue=req.body.voteType;
			newPostVote.author=req.user;
			newPostVote.post=req.post;
			newPostVote.save(function(err,newPostVote){
				if(req.body.voteType===1){
					req.post.scoreUp=req.post.scoreUp+1;
					updownStatus=1;
				}else{
					req.post.scoreDown=req.post.scoreDown+1;
					updownStatus=2;
				}
				req.post.save();
				var response={};

				response.scoreUp=req.post.scoreUp;
				response.scoreDown=req.post.scoreDown;
				response.updownStatus=updownStatus;
				res.send(200,response);

			});
		}
	});

};


