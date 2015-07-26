'use strict';

angular.module('agronet.posts')
.controller('ctrlComments',['$scope', 'Post', '$stateParams', '$sce', 'dialogs','$location',
function($scope, Post, $stateParams, dialogs,$location){

	console.log('radi direktiva post:');
	console.log($scope.post);
	console.log('komentar:');


	$scope.commentReply={};
	$scope.newComment={};
	
	$scope.post.getPostComments(function(comments){
		console.log(comments);
		$scope.comments=comments;

	});
	
	$scope.addComment=function(){

		$scope.post.addComment($scope.comment.text,function(response){
			$scope.allComments.push(response);
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

	$scope.voteComment = function(value,comment){
		console.log('komentari:');
		console.log($scope.allComments);

		$scope.post.voteComment(value,comment._id,function(response){
			console.log(response);
			console.log($scope.comment.scoreUp);
			console.log($scope.comment.scoreDown);
			$scope.comment.scoreUp=response.scoreUp;
			$scope.comment.scoreDown=response.scoreDown;
		});

	};
}]);