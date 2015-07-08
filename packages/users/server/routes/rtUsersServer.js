'use strict';

var users = require('../controllers/usersCtrlServer.js');

//var passport=require('passport');

module.exports = function (app) {

	 app.route('/userDetail')
        .post(users.createUser);


};