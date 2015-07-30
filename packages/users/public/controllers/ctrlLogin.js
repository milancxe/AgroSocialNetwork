'use strict';

angular.module('agronet.users')
.controller('ctrlLogin',['$scope','$rootScope', '$stateParams','$state', 'User',
function($scope, $rootScope, $stateParams, $state , User){
	
	$scope.loginData ={};

	$scope.loginUser=function(){
			console.log($scope.loginData);
			new User().loginUser($scope.loginData, function(loggedinUser){
				$rootScope.user = new User(loggedinUser);
				$scope.user=$rootScope.user;
				console.log('sad cu da picim tranziciju');
				console.log($state.current);
				console.log($scope.user);
	            $state.transitionTo($state.current, $stateParams, {
	                reload: true,
	                inherit: true,
	                notify: true
	            });
			});
	};



}]);