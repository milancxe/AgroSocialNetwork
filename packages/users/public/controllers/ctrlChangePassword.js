'use strict';

angular.module('agronet.users')
.controller('ctrlChangePassword',['$scope','$rootScope', '$stateParams','$state', 'User',
function($scope, $rootScope, $stateParams, $state , User){

	console.log('I wanna change my password and I am:');
	console.log($scope.user);
	$scope.error={};
	$scope.password={};
	$scope.changePassword=function(){
		if($scope.password.newPassword===$scope.password.newPasswordRepeat){
			if($scope.error){
				$scope.error={};
			}
			console.log('slazu se sifre');
			$scope.user.changePassword($scope.password,function(response){

			});
		}else{
			$scope.error.new_password='passwords dont match';
		}
		
	};

}]);