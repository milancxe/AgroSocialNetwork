'use strict';

angular.module('agronet.posts')
.directive('ngVoteReplyComment',[ function() {
	var directive={};
	directive.restrict='A';
	directive.replace=true;
	directive.scope={
		replyComment:'=',
		post:'='
	};
	directive.templateUrl='posts/public/directives/vote/dirVoteReplyComment/tmplDirVoteReplyComment.html';
	directive.controller='ctrlVoteReplyComment';
	directive.link= function (scope, element, attributes) {};
    return directive;
}]);