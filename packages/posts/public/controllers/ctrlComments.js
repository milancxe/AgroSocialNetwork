
/*'use strict';

angular.module('agronet.posts')
.controller('ctrlComments',['$scope', '$stateParams','Post','$location',
	function($scope, $stateParams, Post,$location){
		$scope.commentReply={};
		$scope.comment={};
		

		$scope.commentScore=0+$scope.comment.scoreUp-$scope.comment.scoreDown;
		$scope.addComment=function(){

			$scope.post.addComment($scope.comment.text,function(response){
				$scope.comments.push(response);
				$scope.comment={};
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
			console.log($scope.comments);

			$scope.post.voteComment(value,comment._id,function(response){
				console.log(response);
				console.log($scope.comment.scoreUp);
				console.log($scope.comment.scoreDown);
				$scope.comment.scoreUp=response.scoreUp;
				$scope.comment.scoreDown=response.scoreDown;
			});

		};


	}
]);*/