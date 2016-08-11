'use strict';

var posts= require('../controllers/postControllerServer.js');
var comments=require('../controllers/commentControllerServer.js');
var auth = require('../../../../utils/utilsAuthorization.js');
/*var users = require('../controllers/usersCtrlServer.js');
var utils = require('../../../../utils/utils.js');
var passport=require('passport');*/

module.exports = function (app) {

	app.route('/posts')
		.get(posts.getAllPosts)
        .post(auth.requiresLogin,posts.createPost);
    app.route('/posts/fresh')
        .post(posts.getAllPosts);

    app.route('/posts/:postId')
        .get(posts.getOnePost)
        .put(auth.requiresLogin,posts.update)
        .delete(auth.requiresLogin,posts.deletePost);

    app.route('/posts/search')
        .post(posts.searchPosts);

    /*app.route('/posts/:postId/deleteImage')
    	.post(posts.deleteImageFromPost);*/

    app.route('/posts/vote/:postId')
        .post(auth.requiresLogin,posts.voteOnPost);

    app.route('/posts/:postId/comment')
        .post(auth.requiresLogin,comments.commentOnPost);

    app.route('/posts/:postId/getComments')
        .post(comments.getCommentsOnPost);

    app.route('/posts/:postId/comment/:commentId')
        .post(auth.requiresLogin,comments.addCommentReply);

    app.route('/posts/:postId/comment/:commentId/vote')
        .post(auth.requiresLogin,comments.voteOnComment);

    app.route('/posts/:postId/comment/:commentId/voteReply')
        .post(auth.requiresLogin,comments.voteOnReplyComment);
    
    app.route('/posts/giveMeBestFive')
        .post(posts.giveMeBestFive);



    app.param('postId', posts.post);
    app.param('commentId',comments.comment);
};
