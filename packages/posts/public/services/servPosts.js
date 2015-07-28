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

        PostResource.prototype.addComment=function(commentText,next){
            var post=this;
            $http.post('/posts/'+post._id+'/comment',{ commentText:commentText })
            .success(function(data, status, headers, config){
                if (next) next(data);
            });
        };

        PostResource.prototype.getPostComments=function(next){
            var post=this;
            $http.get('/posts/'+post._id+'/comment')
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
        

        return PostResource;
	}
]);