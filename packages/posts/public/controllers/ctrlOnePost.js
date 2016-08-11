'use strict';

angular.module('agronet.posts')
.controller('ctrlOnePost',['$scope', '$stateParams','Post','$location',
	function($scope, $stateParams, Post,$location){

		$scope.showAddReplyForm=false;


		 new Post().getOne($stateParams.postId,function(post){

			$scope.post =new Post(post);
			$scope.images=$scope.post.postImage;
			$scope.videos=$scope.post.contentVideo;
			$scope.score=0+$scope.post.scoreUp-$scope.post.scoreDown;

		});


		new Post().giveMeBestFive(null,function(bestFive){

			$scope.bestFive=bestFive;
			if(bestFive.length===10){
				$scope.showLoadMore=true;
			}else{
				$scope.showLoadMore=false;
			}
		});
		
		$scope.voteUp = function(){

			$scope.post.votePost($scope.post._id,1,function(response){
				$scope.post.scoreUp=response.scoreUp;
				$scope.post.scoreDown=response.scoreDown;
				$scope.score=0+$scope.post.scoreUp-$scope.post.scoreDown;
				$scope.post.updownStatus=response.updownStatus;
			});

		};

		$scope.voteDown=function(){
			$scope.post.votePost($scope.post._id,2,function(response){
				$scope.post.scoreUp=response.scoreUp;
				$scope.post.scoreDown=response.scoreDown;
				$scope.score=0+$scope.post.scoreUp-$scope.post.scoreDown;
				$scope.post.updownStatus=response.updownStatus;
			});
		};
		
	}
]);