'use strict';

angular.module('agronet.posts')
.directive('ngComments',[ function() {
	var directive={};
	directive.restrict='A';
	directive.replace=true;
	directive.scope={
		post:'='
	};
	directive.templateUrl='posts/public/directives/dirComments/tmplDirComments.html';
	directive.controller='ctrlComments';
	directive.link= function (scope, element, attributes) {};
    return directive;
}]);