'use strict';



angular.module('agronet.posts')
.controller('ctrlDirComments',['$scope', 'Post', '$stateParams', '$sce', 'dialogs','$location',
function($scope, Post, $stateParams, $sce, dialogs,$location){
	$scope.commentReply={};
	$scope.newComment={};

	
	$scope.post.getPostComments(function(comments){
		$scope.comments=comments;
	});

	$scope.addComment=function(){

		$scope.post.addComment($scope.newComment.text,function(response){
			$scope.comments.push(response);
			$scope.newComment={};
		});

	};

	$scope.addCommentReply=function(comment){
		console.log('sad cu izlogujem sta saljem: prvo comentid:');
		console.log(comment);

		$scope.post.addCommentReply(comment._id,$scope.commentReply.text,function(response){
			console.log('stigao je odgovor:');
			console.log(response);
			comment.replies=response;
		});
	};

}]);