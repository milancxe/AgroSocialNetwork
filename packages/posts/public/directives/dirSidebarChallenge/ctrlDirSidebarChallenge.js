'use strict';



angular.module('agronet.posts')
.controller('ctrlSidebarChallenge',['$scope', 'Post', '$stateParams', '$sce', 'dialogs','$location',
function($scope, Post, $stateParams, $sce, dialogs,$location){
	$scope.showComments=false;
	$scope.showVideo=false;


	$scope.showPost=function(){
		 $location.path('/posts/'+$scope.post._id);
	};

	/*$scope.update=function(){
		$location.path('posts/'+$scope.post._id+'/edit');
	};*/

    $scope.remove = function(post) {
        if(post) {
        	var dlg = dialogs.confirm('Please confirm', 'Are you sure you want to delete post: ' + post.title + ' ?');
			dlg.result.then(function(btn) {
				new Post(post).$remove();
	            for(var i in $scope.allPosts) {
	                if($scope.allPosts[i]._id === post._id) {
	                    $scope.allPosts.splice(i, 1);
	                }
	            }
			});  
        }
    };
}]);