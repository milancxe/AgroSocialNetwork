'use strict';

angular.module('agronet.users')
.controller('ctrlLogin',['$scope','$rootScope', '$stateParams','$state', 'User',
function($scope, $rootScope, $stateParams, $state , User){
	
	console.log('radi kontroler za logovanje korisnika');
	$scope.loginData ={};
	$scope.loginUser=function(){
			console.log($scope.loginData);
			new User().loginUser($scope.loginData, function(loggedinUser){
			$rootScope.user = loggedinUser;
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: true
                    });
		});
	};



}]);