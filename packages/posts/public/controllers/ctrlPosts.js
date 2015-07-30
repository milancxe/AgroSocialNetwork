'use strict';

angular.module('agronet.posts')
.controller('ctrlPosts',['$scope','$rootScope', '$stateParams','Post',
	function($scope,$rootScope, $stateParams, Post){

		console.log('iz postova logujem');



		new Post().getAll(function(allPosts){

			$scope.allPosts=allPosts;
		});


	}
]);