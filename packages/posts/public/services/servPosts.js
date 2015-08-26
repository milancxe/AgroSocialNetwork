'use strict';

angular.module('agronet.posts').factory('Post', ['$resource','$http','$state',
    function($resource,$http,$state) {
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

        PostResource.prototype.getAll=function(lastId,next){
            $http.post('posts/fresh',{lastId:lastId})
            .success(function(data,status,headers,config){
                if(next) next(data);
            });
        };

        PostResource.prototype.votePost=function(postId,voteType,next){
            $http.post('posts/vote/'+postId,{ voteType:voteType })
            .success(function(data, status, headers, config){
                if (next) next(data);
            }).
            error(function(data, status, headers, config) {
                console.log('error has occured while voting');
                $state.go('ml.rhf.pleaseLogin');
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };

        PostResource.prototype.addComment=function(commentText,next){
            var post=this;
            $http.post('/posts/'+post._id+'/comment',{ commentText:commentText })
            .success(function(data, status, headers, config){
                if (next) next(data);
            });
        };

        PostResource.prototype.getPostComments=function(lastId,next){
            var post=this;
            $http.post('/posts/'+post._id+'/getComments',{lastId:lastId})
            .success(function(data, status, headers, config){
                if (next) next(data);
            });
        };

        PostResource.prototype.addCommentReply=function(commentId,commentReplyText,next){

            var post=this;
            $http.post('/posts/'+post._id+'/comment/'+commentId,{ commentReplyText:commentReplyText })
            .success(function(data, status, headers, config){
                if (next) next(data);
            });

        };

        PostResource.prototype.voteComment=function(value,commentId,next){

            var post=this;
            $http.post('/posts/'+post._id+'/comment/'+commentId+'/vote',{ value:value })
            .success(function(data, status, headers, config){
                if (next) next(data);
            });
        };

        PostResource.prototype.voteReplyComment=function(value,commentId,replyId,next){

            var post=this;
            $http.post('/posts/'+post._id+'/comment/'+commentId+'/voteReply',{ value:value, replyId:replyId })
            .success(function(data, status, headers, config){
                if (next) next(data);
            });
        };

        
        
        PostResource.prototype.searchPosts=function(searchText,next){

            $http.post('/posts/search',{ searchText:searchText})
            .success(function(data, status, headers, config){
                if (next) next(data);
            });
        };

        return PostResource;
	}
]);