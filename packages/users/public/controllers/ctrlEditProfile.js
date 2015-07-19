'use strict';

angular.module('agronet.users')
.controller('ctrlEditProfile',['$scope','$rootScope', '$stateParams','$state', 'User',
function($scope, $rootScope, $stateParams, $state , User){

	//ovde ne valja
	$scope.editUser=$scope.user;

	$scope.editProfileData=function(){
		new User().editProfile($scope.editUser, function(changedData){
			$scope.user=$scope.editUser;
			$state.go('ml.rhf.mainPage');
		});
	};

}]);