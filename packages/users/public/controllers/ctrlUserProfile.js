'use strict';

angular.module('agronet.users')
.controller('ctrlUserProfile',['$scope','$rootScope', '$stateParams','$state', 'User',
function($scope, $rootScope, $stateParams, $state , User){


	$scope.allPosts=[];
	$scope.showCreatedPosts=false;
	$scope.showVotedPosts=false;
	$scope.showCommentedPosts=false;
	$scope.showLoadMore=false;
	$scope.allowEdit=false;

	new User().getUserProfile($stateParams.userId,function(response){
		console.log(response);
		$scope.user = new User(response);	
		console.log('poredim idijeve');
		if($rootScope.user._id===$scope.user._id){
			console.log('dobar je');
			$scope.allowEdit=true;
		}
	});

	$scope.getCreatedPosts=function(){
		console.log('getting Created posts');
		$scope.user.getPostsCreatedByUser(null,function(response){
			console.log(response);
			$scope.allPosts=response;
			$scope.showCreatedPosts=true;
			$scope.showVotedPosts=false;
			$scope.showCommentedPosts=false;
			if(response.length===10){
				$scope.showLoadMore=true;
			}else{
				$scope.showLoadMore=false;
			}
		});
	};

	$scope.getVotedPosts=function(){
		console.log('getting voted posts');
		$scope.user.getPostsVotedByUser(null,function(response){
			console.log(response);
			$scope.allPosts=response;
			$scope.showCreatedPosts=false;
			$scope.showVotedPosts=true;
			$scope.showCommentedPosts=false;
			if(response.length===10){
				$scope.showLoadMore=true;
			}else{
				$scope.showLoadMore=false;
			}
		});
	};

	$scope.getCommentedPosts=function(){
		console.log('getting commented posts');
		$scope.user.getPostsCommentedByUser(null,function(response){
			console.log(response);
			$scope.allPosts=response;
			$scope.showCreatedPosts=false;
			$scope.showVotedPosts=false;
			$scope.showCommentedPosts=true;
			if(response.length===10){
				$scope.showLoadMore=true;
			}else{
				$scope.showLoadMore=false;
			}
		});
	};

	$scope.loadMore=function(){

			if($scope.showCommentedPosts){
					$scope.user.getPostsCommentedByUser($scope.allPosts[$scope.allPosts.length-1]._id , function(response){

						$scope.allPosts.push.apply($scope.allPosts,response);
						if(response.length===10){
							$scope.showLoadMore=true;	

						}else{
							$scope.showLoadMore=false;
						}
					});
			}
			if($scope.showVotedPosts){
					$scope.user.getPostsVotedByUser($scope.allPosts[$scope.allPosts.length-1]._id , function(response){

						$scope.allPosts.push.apply($scope.allPosts,response);
						if(response.length===10){
							$scope.showLoadMore=true;	

						}else{
							$scope.showLoadMore=false;
						}
					});
			}
			if($scope.showCreatedPosts){
					$scope.user.getPostsCreatedByUser($scope.allPosts[$scope.allPosts.length-1]._id , function(response){

						$scope.allPosts.push.apply($scope.allPosts,response);
						if(response.length===10){
							$scope.showLoadMore=true;	

						}else{
							$scope.showLoadMore=false;
						}
					});
			}
		};


}]);