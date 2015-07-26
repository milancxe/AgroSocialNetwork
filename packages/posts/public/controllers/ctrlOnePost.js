'use strict';

angular.module('agronet.posts')
.controller('ctrlOnePost',['$scope', '$stateParams','Post','$location',
	function($scope, $stateParams, Post,$location){

		$scope.showAddReplyForm=false;

		new Post().getOne($stateParams.postId,function(post){

			$scope.post=new Post(post);


			$scope.images=$scope.post.postImage;

			

			$scope.score=0+$scope.post.scoreUp.length-$scope.post.scoreDown.length;

		});
		
		$scope.voteUp = function(){

			$scope.post.votePost($scope.post._id,1,function(response){
				$scope.post.scoreUp=response.scoreUp;
				$scope.post.scoreDown=response.scoreDown;
				$scope.score=0+$scope.post.scoreUp.length-$scope.post.scoreDown.length;
			});

		};

		$scope.voteDown=function(){
			$scope.post.votePost($scope.post._id,2,function(response){
				$scope.post.scoreUp=response.scoreUp;
				$scope.post.scoreDown=response.scoreDown;
				$scope.score=0+$scope.post.scoreUp.length-$scope.post.scoreDown.length;
			});
		};
		
	}
]);