'use strict';

angular.module('agronet.users')
.controller('ctrlLogout',['$scope','$rootScope', '$stateParams','$state', 'User',
function($scope, $rootScope, $stateParams, $state , User){
	

	$scope.logoutUser=function(){
			new User().logoutUser(function(data){

			$rootScope.user = null;
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: true
                    });
		});
	};



}]);