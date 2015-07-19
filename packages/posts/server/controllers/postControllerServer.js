'use strict';


var mongoose = require('mongoose');
var PostModel = mongoose.model('PostModel');
var fs = require('fs');

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

		post.remove(function(){
			console.log('it has been deleted');
			return res.json(200);
		});
	});

};