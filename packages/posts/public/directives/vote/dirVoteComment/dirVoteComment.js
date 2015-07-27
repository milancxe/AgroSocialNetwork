'use strict';

angular.module('agronet.posts')
.directive('ngVoteComment',[ function() {
	var directive={};
	directive.restrict='A';
	directive.replace=true;
	directive.scope={
		comment:'='
	};
	directive.templateUrl='posts/public/directives/vote/dirVoteComment/tmplDirVoteComment.html';
	directive.controller='ctrlVoteComment';
	directive.link= function (scope, element, attributes) {};
    return directive;
}]);