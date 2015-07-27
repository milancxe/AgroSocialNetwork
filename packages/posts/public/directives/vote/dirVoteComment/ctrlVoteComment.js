'use strict';



angular.module('agronet.posts')
.controller('ctrlVoteComment',['$scope', 'Post', '$stateParams', '$sce', 'dialogs','$location',
function($scope, Post, $stateParams, $sce, dialogs,$location){
	
	$scope.voteComment = function(value){
		/*console.log(value);
		console.log($scope.comment._id);*/
		/*console.log('post:');
		console.log($scope.$parent.post);*/
		$scope.$parent.post.voteComment(value,$scope.comment._id,function(response){
			console.log(response);
		});

	};

}]);