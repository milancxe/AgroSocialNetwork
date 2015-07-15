'use strict';

angular.module('agronet.posts')
.controller('ctrlOnePost',['$scope', '$stateParams','Post','$location',
	function($scope, $stateParams, Post,$location){


		new Post().getOne($stateParams.postId,function(post){
			console.log('pribavljam post');
			console.log(post);

			$scope.post=new Post(post);
		});
		


	}
]);