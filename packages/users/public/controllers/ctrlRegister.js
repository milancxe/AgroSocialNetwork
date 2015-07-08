'use strict';

angular.module('agronet.users')
.controller('ctrlRegister',['$scope', '$stateParams', 'User',
function($scope, $stateParams, User){
	
	console.log('radi kontroler za registrovanje korisnika');
	$scope.editUser ={};

	$scope.createUser = function(){

		console.log($scope.editUser);
		new User().createUser($scope.editUser, function(createdUser){
			console.log('user has been created');
		});

	};
}]);