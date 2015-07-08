'use strict';

angular.module('agronet.system', ['agronet.loginInterceptor']);
try { angular.module('templates-main'); } catch(err) { angular.module('templates-main', []);}
//global initialization
angular.element(document).ready(function() {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') window.location.hash = '#!';

  //Then init the app
  angular.bootstrap(document, ['agronet']);
});


var packageModules = [
'agronet.system',
'agronet.users',
'agronet.posts',
'templates-main'
];
var modules = [
'ngCookies',
'ngResource',
'ui.bootstrap',
'ui.router',
'angularFileUpload',
'LocalStorageModule',
'ngSanitize',
'dialogs.main',
/*translate has to be included because of dialogs.main*/
'pascalprecht.translate'
];
modules = modules.concat(packageModules);

angular.module('agronet', modules).run();
