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

        UserResource.prototype.editProfile=function(newUserData,next){
            $http.post('/users/editProfile',newUserData)
            .success(function(data, status, headers, config){
                if (next) next(data);
            });
        };

        UserResource.prototype.loginUser=function(user,next){
        	console.log(user.email,user.password,user.remember_me);
        	$http.post('userLogin',{ email:user.email,password:user.password,remember_me:user.remember_me })
        	.success(function(data, status, headers, config){
        		if (next) next(data);
        	}).
        	error(function(data, status, headers, config) {
        		console.log('error has occured while login');
    			// called asynchronously if an error occurs
    			// or server returns response with an error status.
  			});

        };

        UserResource.prototype.logoutUser=function(next){

        		$http.get('/logout')
        			.success(function(data, status, headers, config) {
        				console.log('user has logged out');
        				next(data);
        			}).
        			error(function(data, status,headers,config){

        			});

		};

        UserResource.prototype.changePassword=function(password,next){

            var user=this;
            $http.post('/users/'+user._id+'/changePassword',{password:password  })
            .success(function(data, status, headers, config){
                if (next) next(data);
            }).
            error(function(data, status, headers, config) {
                console.log('error has occured while login');
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        };

        UserResource.prototype.getUserProfile=function(userId,next){

            $http.post('/users/'+userId+'/userProfile',{userId:userId})
            .success(function(data, status, headers, config){
                if (next) next(data);
            }).
            error(function(data, status, headers, config) {
                console.log('error has occured while fetching user details');
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        };

        UserResource.prototype.getPostsCreatedByUser=function(lastId,next){
            var userId = this._id;
            $http.post('/users/userProfile/'+userId+'/createdPosts',{lastId:lastId,userId:userId})
            .success(function(data, status, headers, config){
                if (next) next(data);
            }).
            error(function(data, status, headers, config) {
                console.log('error has occured while fetching user details');
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        };

        UserResource.prototype.getPostsVotedByUser=function(lastId,next){
            var userId = this._id;
            $http.post('/users/userProfile/'+userId+'/votedPosts',{lastId:lastId,userId:userId})
            .success(function(data, status, headers, config){
                if (next) next(data);
            }).
            error(function(data, status, headers, config) {
                console.log('error has occured while fetching user details');
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        };

        UserResource.prototype.getPostsCommentedByUser=function(lastId,next){
            var userId = this._id;
            $http.post('/users/userProfile/'+userId+'/commentedPosts',{lastId:lastId,userId:userId})
            .success(function(data, status, headers, config){
                if (next) next(data);
            }).
            error(function(data, status, headers, config) {
                console.log('error has occured while fetching user details');
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        };




        return UserResource;
	}
]);