'use strict';

var users = require('../controllers/usersCtrlServer.js');
var utils = require('../../../../utils/utils.js');
var passport=require('passport');
var auth = require('../../../../utils/utilsAuthorization.js');
module.exports = function (app) {

	app.route('/userDetail')
        .post(users.createUser);

    app.route('/userLogin')
        .post(passport.authenticate('local', {
            failureFlash: true
        }),
        function(req, res) {
            // Issue a remember me cookie if the option was checked
            if (req.body.remember_me){
                utils.issueToken(req.user, function(err, token) {
                    if (!err){
                        res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
                    }
                });
            }
            res.send({
                user: req.user
            });
    });

    app.route('/loggedin')
    .get(function (req, res) {
		try{        
	        if(req.isAuthenticated()){
	            res.send(200,req.user);
	        }else{
	            var cookies = [];
	            if(req.headers.cookie){
		            req.headers.cookie.split(';').forEach(function( cookie ) {
		                var parts = cookie.split('=');
		                cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
		            });
		            if(cookies.remember_me) {
		                passport.authenticate('remember-me', function (req, res) {});
		            }else{
		            	res.send(200,'0');	
		            }
		        }else{
		        	res.send(200,'0');
		        }
	        }
    	}catch(err){console.log(err);}
       // res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.route('/logout')
    	.get(auth.requiresLogin,users.logoutUser);


    app.route('/users/editProfile')
        .post(auth.requiresLogin,users.editProfile);

    app.route('/users/:userId/changePassword')
        .post(auth.requiresLogin,users.changePassword);

    app.route('/users/:userId/userProfile')
        .post(users.getUser);


    app.route('/users/userProfile/:userId/createdPosts')
        .post(users.getPostsCreatedByUser);
    app.route('/users/userProfile/:userId/votedPosts')
        .post(users.getPostsVotedByUser);
    app.route('/users/userProfile/:userId/commentedPosts')
        .post(users.getPostsCommentedByUser);

    app.param('userId', users.user);
};