'use strict';

angular.module('agronet.posts')
.directive('ngShowSmallPost',[ function() {
	var directive={};
	directive.restrict='A';
	directive.replace=true;
	directive.scope={
		post:'=',
		allPosts:'=',
		allowEdit:'='
	};
	directive.templateUrl='posts/public/directives/dirShowSmallPost/tmplDirShowPostSmall.html';
	directive.controller='ctrlShowPostSmall';
	directive.link= function (scope, element, attributes) {};
    return directive;
}]);