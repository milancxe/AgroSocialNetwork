'use strict';

var assetsBower={
	css:[],
	js:[
		'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-file-upload/angular-file-upload.min.js',
        'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-dialog-service/dialogs.js',
        'bower_components/angular-translate/angular-translate.min.js',
        'bower_components/moment/min/moment.min.js'
	],
	expose:[
		['./bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff','/fonts/glyphicons-halflings-regular.woff'],
		['./bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf ','/fonts/glyphicons-halflings-regular.ttf '],
		['./bower_components/jquery/dist/jquery.min.map','/bower_components/jquery/dist/jquery.min.map'],
		['./bower_components/angular-file-upload/angular-file-upload.min.map','/bower_components/angular-file-upload/angular-file-upload.min.map'],
		['./bower_components/angular-sanitize/angular-sanitize.min.js.map','/bower_components/angular-sanitize/angular-sanitize.min.js.map'],
		['./bower_components/angular-socket-io/socket.min.js.map','/bower_components/angular-socket-io/socket.min.js.map']
	],
	exposeProduction:[
		['./bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff','/fonts/glyphicons-halflings-regular.woff'],
		['./bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf ','/fonts/glyphicons-halflings-regular.ttf ']
	]
};
module.exports = assetsBower;