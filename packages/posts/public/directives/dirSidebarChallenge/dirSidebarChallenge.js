'use strict';

angular.module('agronet.posts')
.directive('ngSidebarChallenge',[ function() {
	var directive={};
	directive.restrict='A';
	directive.replace=true;
	directive.scope={
		post:'=',
		allPosts:'='
	};
	directive.templateUrl='posts/public/directives/dirSidebarChallenge/tmplDirSidebarChallenge.html';
	directive.controller='ctrlSidebarChallenge';
	directive.link= function (scope, element, attributes) {};
    return directive;
}]);