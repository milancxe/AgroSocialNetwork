'use strict';

angular.module('agronet.posts')
.controller('ctrlPosts',['$scope','$rootScope', '$stateParams','Post',
	function($scope,$rootScope, $stateParams, Post){





		new Post().getAll(function(allPosts){

			$scope.allPosts=allPosts;
			console.log('iz postova logujem');
			console.log($scope.allPosts);
		});


	}
]);