'use strict';

angular.module('agronet.posts')
.controller('ctrlNewPost',['$scope', '$stateParams','Post','$location',
	function($scope, $stateParams, Post,$location){

		$scope.newPost = {};
		$scope.createNewPost = function(){
			new Post().createNewPost($scope.newPost,function(data){
				//new Post().showOnePost(data);
				$location.path('posts/' + data._id);
			});
		};



	}
]);