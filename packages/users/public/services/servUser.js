'use strict';

angular.module('agronet.users').factory('User', ['$resource','$http',
    function($resource,$http) {
        var UserResource = $resource('');

        UserResource.prototype.createUser=function(user,next){
        	$http.post('userDetail',user)
        	.success(function(data, status, headers, config){
        		if (next) next(data);
        	});

        };




        return UserResource;
	}
]);