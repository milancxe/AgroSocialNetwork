'use strict';

angular.module('agronet.users')
.controller('ctrlUserProfile',['$scope','$rootScope', '$stateParams','$state', 'User',
function($scope, $rootScope, $stateParams, $state , User){

	console.log('this is controller for user profile');
	console.log($stateParams.userId);

	new User().getUserProfile($stateParams.userId,function(response){
		console.log(response);
	});

}]);