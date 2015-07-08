'use strict';

angular.module('agronet.system').factory('CheckAuth', ['$http','$rootScope','$q','User',
function($http,$rootScope,$q,User) {
	var CheckAuth = {};
	CheckAuth.checkUser=function(){
		if(!$rootScope.startUserChecked&&!$rootScope.user){
			var deferred = $q.defer();
			$http.get('/loggedin').success(function(response) {
				$rootScope.startUserChecked=true;
				if (response !== '0') {
					$rootScope.user = new User(response);
				}
				deferred.resolve($rootScope.user);
			});
			return deferred.promise;
		}else{
			return null;
		}
	};
	return CheckAuth;
}
]);
