'use strict';

angular.module('agronet.posts').factory('Post', ['$resource','$http',
    function($resource,$http) {
        var PostResource = $resource('/posts/:postId',{

                postId:'@_id'
                
            }, {
                update:{
                    method:'PUT'
                }
            });

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

        PostResource.prototype.votePost=function(postId,voteType,next){
            $http.post('posts/vote/'+postId,{ voteType:voteType })
            .success(function(data, status, headers, config){
                if (next) next(data);
            });
        };
        

        return PostResource;
	}
]);