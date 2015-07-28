'use strict';



angular.module('agronet.posts')
.controller('ctrlVoteReplyComment',['$scope', 'Post', '$stateParams', '$sce', 'dialogs','$location',
function($scope, Post, $stateParams, $sce, dialogs,$location){


	var commentId=$scope.$parent.comment._id;
	$scope.replyScore=0+$scope.replyComment.scoreUp-$scope.replyComment.scoreDown;

	$scope.voteReplyComment=function(value){


		$scope.post.voteReplyComment(value , commentId , $scope.replyComment._id, function(response){

			console.log(response);
			$scope.replyScore=0+response.scoreUp-response.scoreDown;
		});

	};

}]);