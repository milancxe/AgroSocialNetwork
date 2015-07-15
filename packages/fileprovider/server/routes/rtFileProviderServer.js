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

    app.route('/files/uploadImage')
        .post(/*auth.requiresLogin,*/ hasAuthorization, fileprovider.uploadImage);



    app.param('fileSize', fileprovider.fileSize);
    app.param('filename', fileprovider.filename);
};