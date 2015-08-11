'use strict';



angular.module('agronet.posts')
.controller('ctrlDirComments',['$scope', 'Post','$rootScope', '$stateParams', '$sce', 'dialogs','$location',
function($scope, Post,$rootScope, $stateParams, $sce, dialogs,$location){
	$scope.commentReply={};
	$scope.newComment={};
	$scope.showLoadMoreComments=false;


	$scope.loadMoreComments=function(){

		$scope.post.getPostComments($scope.comments[$scope.comments.length-1]._id , function(response){

			$scope.comments.push.apply($scope.comments,response);
			if(response.length===10){
				$scope.showLoadMoreComments=true;	

			}else{
				$scope.showLoadMoreComments=false;
			}
		});
	};
	
	$scope.post.getPostComments(null,function(comments){
		$scope.comments=comments;
		if(comments.length===10){
				$scope.showLoadMoreComments=true;
			}else{
				$scope.showLoadMoreComments=false;
		}
		
	});

	$scope.addComment=function(){
		$scope.post.addComment($scope.newComment.text,function(response){
			if(!$scope.comments){
				$scope.comments=[];
			}

			response.author=$rootScope.user;
			$scope.comments.push(response);
			$scope.newComment={};
		});

	};

	$scope.addCommentReply=function(comment){
		$scope.post.addCommentReply(comment._id,$scope.commentReply.text,function(response){
			comment.replies=response;
			$scope.commentReply={};
		});
	};

}]);