'use strict';

angular.module('agronet.users')
.controller('ctrlUserProfile',['$scope','$rootScope', '$stateParams','$state', 'User',
function($scope, $rootScope, $stateParams, $state , User){

	console.log('this is controller for user profile');
	console.log($stateParams.userId);

	new User().getUserProfile($stateParams.userId,function(response){
		console.log(response);
		$scope.user = new User(response);	
	});

	$scope.getCreatedPosts=function(){
		console.log('getting Created posts');
		$scope.user.getPostsCreatedByUser(function(response){
			console.log(response);
		});
	};

	$scope.getVotedPosts=function(){
		console.log('getting voted posts');
		$scope.user.getPostsVotedByUser(function(response){
			console.log(response);
		});
	};

	$scope.getCommentedPosts=function(){
		console.log('getting commented posts');
		$scope.user.getPostsCommentedByUser(function(response){
			console.log(response);
		});
	};

}]);