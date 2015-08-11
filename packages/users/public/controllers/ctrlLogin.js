'use strict';

angular.module('agronet.users')
.controller('ctrlLogin',['$scope','$rootScope','$state', '$stateParams', 'User','$http',
function($scope, $rootScope, $state , $stateParams, User,$http){
	

	$scope.loginerror=null;
        
        // Register the login() function
        $scope.loginUser = function () {
            $http.post('/userLogin', {
                email: $scope.loginData.email,
                password: $scope.loginData.password,
                remember_me: $scope.loginData.remember_me
            }).success(function (response) {
                    
                    
                    $scope.loginError = 0;
                    var loggedUser = new User(response.user);
                    $rootScope.user = loggedUser;
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: true
                    });
                })
                .error(function () {
                    $scope.loginerror = 'Authentication failed.';
                });
        };
    


}]);