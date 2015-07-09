'use strict';

angular.module('agronet.posts').factory('Post', ['$resource','$http',
    function($resource,$http) {
        var PostResource = $resource('');

        PostResource.prototype.createNewPost=function(newPost,next){
        	$http.post('createPost',newPost)
        	.success(function(data, status, headers, config){
        		if (next) next(data);
        	});

        };
        PostResource.prototype.getOne=function(postId,next){
            $http.get('posts/'+postId)
            .success(function(data, status, headers, config){
                if (next) next(data);
            });
        };

        PostResource.prototype.getAll=function(next){
            $http.get('posts')
            .success(function(data,status,headers,config){
                if(next) next(data);
            });
        };
        

        return PostResource;
	}
]);