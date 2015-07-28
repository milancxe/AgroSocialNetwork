'use strict';



angular.module('agronet.posts')
.controller('ctrlDirComments',['$scope', 'Post', '$stateParams', '$sce', 'dialogs','$location',
function($scope, Post, $stateParams, $sce, dialogs,$location){
	$scope.commentReply={};
	$scope.newComment={};
	console.log('logujem komentare iz direktive komments');


	
	$scope.post.getPostComments(function(comments){
		$scope.comments=comments;
		
		console.log($scope.comments);
	});

	$scope.addComment=function(){
		$scope.post.addComment($scope.newComment.text,function(response){
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