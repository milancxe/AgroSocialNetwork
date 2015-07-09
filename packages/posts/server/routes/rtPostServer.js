'use strict';

var posts= require('../controllers/postControllerServer.js');

/*var users = require('../controllers/usersCtrlServer.js');
var utils = require('../../../../utils/utils.js');
var passport=require('passport');*/

module.exports = function (app) {

	app.route('/createPost')
        .post(posts.createPost);

    app.route('/posts/:postId')
        .get(posts.getOnePost);

    app.route('/posts')
        .get(posts.getAllPosts);


    app.param('postId', posts.post);
};
