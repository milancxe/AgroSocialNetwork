'use strict';


var mongoose = require('mongoose');
var PostModel = mongoose.model('PostModel');
var CommentModel = mongoose.model('CommentModel');
var fs = require('fs');
var _ = require('lodash');
exports.post = function (req, res, next,id) {
	PostModel.findOne({ _id: id}, function (err, post){
  		req.post=post;
  		next();
	});
};

exports.getOnePost = function (req, res) {

	res.send(req.post);
};

exports.getAllPosts=function(req,res){

	PostModel.find().populate('author').exec(function (err, posts) {
  		if (err) return console.error(err);
  		
  		res.send(posts);
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

exports.voteOnPost = function(req,res,next){

	var voted=false;
	var votedUp=false;
	var votedDown=false;
	var votedIndex=-1;
	//Note:
	//If i already voted on challenge i cannot vote again,

	//checking to see if he alreadu upvoted
	for(var i=0;i<req.post.scoreUp.length;i=i+1){
			if(req.post.scoreUp[i].equals(req.user._id)){
				votedUp=true;
				votedIndex=i;
			}
	}
	//checking to see if he already downvoted
	for(var i=0;i<req.post.scoreDown.length;i=i+1){
			if(req.post.scoreDown[i].equals(req.user._id)){
				votedDown=true;
				votedIndex=i;
			}
	}

	//if i want to upvote 
	if(req.body.voteType===1){
		if(votedUp){
			req.post.scoreUp.splice(votedIndex,1);
			voted=true;
		}else if(votedDown){
			req.post.scoreDown.splice(votedIndex,1);
			req.post.scoreUp.push(req.user);
			voted=true;
		}else{
			req.post.scoreUp.push(req.user);
			voted=true;
		}
	//downvote
	}else if(req.body.voteType===2){
		console.log('entered type 2');
		if(votedUp){
			console.log('votedUp');
			req.post.scoreUp.splice(votedIndex,1);
			req.post.scoreDown.push(req.user);
			voted=true;
		}else if(votedDown){

			console.log('votedDown');
			req.post.scoreDown.splice(votedIndex,1);
			voted=true;
		}else{
			req.post.scoreDown.push(req.user);
			voted=true;
		}
	}else{
		res.json(500);
	}
	if(voted){
		req.post.save(function(err,post){
			if(err) res.json(500,{error:'cannot vote on challenge'});
			res.json(200,{scoreUp:post.scoreUp,scoreDown:post.scoreDown});
		});
		
	}
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


	CommentModel.find({post:req.post._id}).populate('author').exec(function(err,posts){

		CommentModel.populate(posts,{path: 'replies.author', model: 'UserModel'},function(err, posts){
			if(err) res.send(500,{error:'I cannot find comments'});
			res.send(200,posts);
		});

	});
};
