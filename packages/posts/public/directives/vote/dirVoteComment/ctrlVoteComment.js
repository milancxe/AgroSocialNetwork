'use strict';



angular.module('agronet.posts')
.controller('ctrlVoteComment',['$scope', 'Post', '$stateParams', '$sce', 'dialogs','$location',
function($scope, Post, $stateParams, $sce, dialogs,$location){

	$scope.score=0+$scope.comment.scoreUp-$scope.comment.scoreDown;
	$scope.voteComment = function(value){
		$scope.$parent.post.voteComment(value,$scope.comment._id,function(response){
			$scope.comment.scoreUp=response.scoreUp;
			$scope.comment.scoreDown=response.scoreDown;
			$scope.comment.updownStatus=response.updownStatus;
			$scope.score=0+$scope.comment.scoreUp-$scope.comment.scoreDown;
		});

	};

}]);