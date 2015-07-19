'use strict';

angular.module('agronet.posts')
.controller('ctrlOnePost',['$scope', '$stateParams','Post','$location',
	function($scope, $stateParams, Post,$location){


		new Post().getOne($stateParams.postId,function(post){

			$scope.post=new Post(post);
			console.log('ovaj post ima vise slika:');
			console.log($scope.post.postImage);

			$scope.images=$scope.post.postImage;
			
		});
		


	}
]);