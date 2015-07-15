'use strict';


var mongoose = require('mongoose');
var PostModel = mongoose.model('PostModel');


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

	PostModel.find(function (err, posts) {
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