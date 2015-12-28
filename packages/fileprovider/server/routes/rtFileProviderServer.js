'use strict';

var fileprovider = require('../controllers/fileProviderControllerServer.js');
var hasAuthorization = function(req, res, next) {
	console.log('pozvana je hasAuthorization');
    /*if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
     return res.send(401, 'Nemate prava da pristupite datom sadržaju');
     }*/
    next();
};

module.exports = function(app) {


	app.route('/files/post/:fileSize/:filename')
        .get(fileprovider.getPostImage);

    app.route('/files/logo/:filename')
        .get(fileprovider.getLogo);

    app.route('/files/uploadImage')
        .post(/*auth.requiresLogin,*/ hasAuthorization, fileprovider.uploadImage);

    app.route('/files/user/uploadImage')
        .post(/*auth.requiresLogin,*/ hasAuthorization, fileprovider.uploadUserImage);

    app.route('/files/profilePicture/:fileSize/:filename')
        .get(fileprovider.getProfilePicture);

    app.route('/files/user/changeProfilePicture')
        .post(/*auth.requiresLogin,*/ hasAuthorization, fileprovider.changeProfilePicture);


    app.param('fileSize', fileprovider.fileSize);
    app.param('filename', fileprovider.filename);
};