'use strict';



angular.module('agronet.posts')
.controller('ctrlVotePost',['$scope', 'Post', '$stateParams', '$sce', 'dialogs','$location',
function($scope, Post, $stateParams, $sce, dialogs,$location){

	$scope.score=0+$scope.post.scoreUp-$scope.post.scoreDown;


	$scope.voteUp = function(){

		new Post().votePost($scope.post._id,1,function(response){
			$scope.post.scoreUp=response.scoreUp;
			$scope.post.scoreDown=response.scoreDown;
			$scope.score=0+$scope.post.scoreUp-$scope.post.scoreDown;
			$scope.post.updownStatus=response.updownStatus;
		});

	};

	$scope.voteDown=function(){
		new Post().votePost($scope.post._id,2,function(response){
			$scope.post.scoreUp=response.scoreUp;
			$scope.post.scoreDown=response.scoreDown;
			$scope.score=0+$scope.post.scoreUp-$scope.post.scoreDown;
			$scope.post.updownStatus=response.updownStatus;
		});
	};

}]);