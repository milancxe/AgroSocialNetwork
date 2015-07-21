'use strict';

var posts= require('../controllers/postControllerServer.js');

/*var users = require('../controllers/usersCtrlServer.js');
var utils = require('../../../../utils/utils.js');
var passport=require('passport');*/

module.exports = function (app) {

	app.route('/posts')
		.get(posts.getAllPosts)
        .post(posts.createPost);

    app.route('/posts/:postId')
        .get(posts.getOnePost)
        .put(posts.update)
        .delete(posts.deletePost);

    app.route('/posts/:postId/deleteImage')
    	.post(posts.deleteImageFromPost);

    app.route('/posts/vote/:postId')
        .post(posts.voteOnPost);

    app.route('/posts/:postId/comment')
        .get(posts.getCommentsOnPost)
        .post(posts.commentOnPost);
        


    app.param('postId', posts.post);
};
