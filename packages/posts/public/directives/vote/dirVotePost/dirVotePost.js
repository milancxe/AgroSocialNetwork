'use strict';

angular.module('agronet.posts')
.directive('ngVotePost',[ function() {
	var directive={};
	directive.restrict='A';
	directive.replace=true;
	directive.scope={
		post:'='
	};
	directive.templateUrl='posts/public/directives/vote/dirVotePost/tmplDirVotePost.html';
	directive.controller='ctrlVotePost';
	directive.link= function (scope, element, attributes) {};
    return directive;
}]);