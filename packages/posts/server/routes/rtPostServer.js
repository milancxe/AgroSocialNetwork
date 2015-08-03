'use strict';

var posts= require('../controllers/postControllerServer.js');
var comments=require('../controllers/commentControllerServer.js');
/*var users = require('../controllers/usersCtrlServer.js');
var utils = require('../../../../utils/utils.js');
var passport=require('passport');*/

module.exports = function (app) {

	app.route('/posts')
		.get(posts.getAllPosts)
        .post(posts.createPost);
    app.route('/posts/fresh')
        .post(posts.getAllPosts);

    app.route('/posts/:postId')
        .get(posts.getOnePost)
        .put(posts.update)
        .delete(posts.deletePost);

    /*app.route('/posts/:postId/deleteImage')
    	.post(posts.deleteImageFromPost);*/

    app.route('/posts/vote/:postId')
        .post(posts.voteOnPost);

    app.route('/posts/:postId/comment')
        .get(comments.getCommentsOnPost)
        .post(comments.commentOnPost);

    app.route('/posts/:postId/comment/:commentId')
        .post(comments.addCommentReply);

    app.route('/posts/:postId/comment/:commentId/vote')
        .post(comments.voteOnComment);

    app.route('/posts/:postId/comment/:commentId/voteReply')
        .post(comments.voteOnReplyComment);

    app.param('postId', posts.post);
    app.param('commentId',comments.comment);
};
