'use strict';

angular.module('agronet.users')
.controller('ctrlRegister',['$scope','$rootScope', '$stateParams','$state', 'User',
function($scope, $rootScope, $stateParams, $state , User){
	
	console.log('radi kontroler za registrovanje korisnika');
	$scope.editUser ={};

	$scope.createUser = function(){

		console.log($scope.editUser);
		new User().createUser($scope.editUser, function(createdUser){
			$rootScope.user=createdUser;
			$state.go('ml.rhf.mainPage',{}, {
	                    	reload: true,
						    inherit: true}
						);
		});

	};
}]);